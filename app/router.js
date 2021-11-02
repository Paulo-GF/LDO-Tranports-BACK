const { Router } = require('express');
const router = new Router();

/* Controllers*/
const adminController = require('./controllers/adminController');
const jobController = require('./controllers/jobController');

/* Middleware */
const authorizationMiddleware = require('./middleware/authorizationMiddleware');
const validatorModule = require('./middleware/validator')


// Validation schemas
const schemaPassword = require('./middleware/schemas/password');
const {addJobSchema, updateJobSchema} = require('./middleware/schemas/job');

// Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.patch('/admin-logged', authorizationMiddleware, validatorModule.isCorrect(schemaPassword), adminController.modifyPassword);

// Jobs API
router.get('/recrutement', jobController.getAllJobs);
router.patch('/recrutement/:jobId', authorizationMiddleware, validatorModule.isCorrect(updateJobSchema), jobController.updateJob);
router.delete('/recrutement/:jobId', authorizationMiddleware, jobController.deleteJob);
router.post('/recrutement/add-job', authorizationMiddleware, validatorModule.isCorrect(addJobSchema),jobController.addJob);

// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;

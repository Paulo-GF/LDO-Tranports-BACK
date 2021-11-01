const { Router } = require('express');
const router = new Router();

const adminController = require('./controllers/adminController');
const jobController = require('./controllers/jobController');
const authorizationMiddleware = require('./middleware/authorizationMiddleware');


// Router - Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.patch('/admin-logged/:userFirstName', authorizationMiddleware, adminController.modifyPassword);

// Router - Jobs API
router.get('/recrutement', jobController.getAllJobs);
router.patch('/recrutement/:jobId', authorizationMiddleware, jobController.updateJob);
router.delete('/recrutement/:jobId', authorizationMiddleware, jobController.deleteJob);
router.post('/recrutement/add-job', authorizationMiddleware, jobController.addJob);

// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;

const { Router } = require('express');
const router = new Router();

const adminController = require('./controllers/adminController');
const jobController = require('./controllers/jobController');
const authorizationMiddleware = require('./middleware/authorizationMiddleware');


// Router - Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.post('/admin-logged/:adminId', authorizationMiddleware, adminController.modifyPassword);

// Router - Jobs API
router.get('/recrutement', jobController.getAllJobs);
router.patch('/recrutement/:jobId', jobController.updateJob);
router.delete('/recrutement/:jobId', jobController.deleteJob);
router.post('/recrutement/add-job', jobController.addJob);

// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;
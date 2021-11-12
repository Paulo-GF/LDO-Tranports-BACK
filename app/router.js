const { Router } = require('express');
const router = new Router();

/* Redis : Cache management*/
//const cacheService = require('./service/cache');
//const redis = require("redis");
//const client = redis.createClient({
    // Add prefix for all project keys
   // prefix:process.env.REDIS_PREFIX
//});

//const {cache,flush} = cacheService(client,60*60*12); // 12h cache

/* Controllers*/
const adminController = require('./controllers/adminController');
const jobController = require('./controllers/jobController');
const contactController = require('./controllers/contactController');
const applyController = require('./controllers/applyController');

/* Middleware */
const authorizationMiddleware = require('./middleware/authorizationMiddleware');
const validatorModule = require('./middleware/validator');
const uploadFiles = require('./middleware/uploadFiles')


/* Validation schemas */
const schemaPassword = require('./middleware/schemas/password');
const schemaAddJob = require('./middleware/schemas/addJob');
const schemaUpdateJob = require('./middleware/schemas/updateJob');
const contactSchema = require('./middleware/schemas/contact');
const applySchema = require('./middleware/schemas/apply');

/* Admin Connection */
router.post('/admin-signin', adminController.adminSignin);
router.patch('/admin-logged', authorizationMiddleware, validatorModule.isCorrect(schemaPassword), adminController.modifyPassword);

/* Jobs */
router.get('/recrutement', jobController.getAllJobs); //cache
router.get('/recrutement/:jobId', jobController.getOneJob); //cache
router.patch('/recrutement/:jobId', authorizationMiddleware, validatorModule.isCorrect(schemaUpdateJob), jobController.updateJob); //flush
router.delete('/recrutement/:jobId', authorizationMiddleware, jobController.deleteJob); //flush
router.post('/recrutement/add-job', authorizationMiddleware, validatorModule.isCorrect(schemaAddJob), jobController.addJob); // flush
router.post('/recrutement/:jobId', uploadFiles, validatorModule.isCorrect(applySchema), applyController.sendApply);

/* Contact */
router.post('/contact', uploadFiles, validatorModule.isCorrect(contactSchema), contactController.sendMail);


// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;

const { Router } = require('express');
const router = new Router();

/* Redis : Cache management*/
const cacheService = require('./service/cache');
const redis = require("redis");
const client = redis.createClient({
    // Add prefix for all project keys
    prefix:process.env.REDIS_PREFIX
});

const {cache,flush} = cacheService(client,60*60*12); // 12h cache

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
router.get('/recrutement', cache, jobController.getAllJobs);
router.patch('/recrutement/:jobId', flush, authorizationMiddleware, validatorModule.isCorrect(updateJobSchema), jobController.updateJob);
router.delete('/recrutement/:jobId', flush, authorizationMiddleware, jobController.deleteJob);
router.post('/recrutement/add-job', flush, authorizationMiddleware, validatorModule.isCorrect(addJobSchema),jobController.addJob);

// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;

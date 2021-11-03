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

/* Middleware */
const authorizationMiddleware = require('./middleware/authorizationMiddleware');
const validatorModule = require('./middleware/validator');


// Validation schemas
const schemaPassword = require('./middleware/schemas/password');
const schemaAddJob = require('./middleware/schemas/addJob');
const schemaUpdateJob = require('./middleware/schemas/updateJob');

// Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.patch('/admin-logged', authorizationMiddleware, validatorModule.isCorrect(schemaPassword), adminController.modifyPassword);

// Jobs API
router.get('/recrutement', jobController.getAllJobs); //cache
router.patch('/recrutement/:jobId', authorizationMiddleware, validatorModule.isCorrect(schemaUpdateJob), jobController.updateJob); //flush 
router.delete('/recrutement/:jobId', authorizationMiddleware, jobController.deleteJob); //flush
router.post('/recrutement/add-job', authorizationMiddleware, validatorModule.isCorrect(schemaAddJob),jobController.addJob); // flush

// Contact
router.post('/contact', contactController.sendMail)

/* Réflexions autour de nodemailer -> Pour la page contact : 
* Pour envoyer un mail, il nous faut les informations du front (submit d'un form)
   * mail user
   * firstname
   * lastname
   * objet
   * pièce jointe
   * message
* La route front : GET de la page contact
* La route back : POST du contact
* Nodemailer : On récupére les informations et on les envoie par mail
*/


// router.get("/logout", authorizationMiddleware, (_, res) => {
//     return res
//         .clearCookie("access_token")
//         .status(200)
//         .json({ message: "Successfully logged out 😏 🍀" });
// });



module.exports = router;

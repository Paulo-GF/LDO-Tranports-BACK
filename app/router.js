const {Router} = require('express');

const router = new Router();

const adminController = require('./controllers/adminController');

// Router - Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.post('/admin-logged/:adminId', adminController.modifyPassword);


router.get('/recrutement', adminController.getAllUsers);

module.exports = router;
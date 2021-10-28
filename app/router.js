const {Router} = require('express');

const router = new Router();

const adminController = require('./controllers/adminController');
const adminMiddleware = require('./middleware/adminMiddleware');

// Router - Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.post('/admin-logged/:adminId', adminMiddleware.isAdmin, adminController.modifyPassword);

router.get('/recrutement', (req, res) =>{
    res.json('coucou')
})

module.exports = router;
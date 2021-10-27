const {Router} = require('express');

const router = new Router();

const adminController = require('./controllers/adminController');
const adminMiddleware = require('./middleware/adminMiddleware');

// Router - Admin Connection
router.post('/admin-signin', adminController.adminConnection);


module.exports = router;
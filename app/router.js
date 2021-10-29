const { Router } = require('express');
const router = new Router();

const adminController = require('./controllers/adminController');
const authorizationMiddleware = require('./middleware/authorizationMiddleware')


// Router - Admin Connection
router.post('/admin-signin', adminController.adminSignin);
router.post('/admin-logged/:adminId', authorizationMiddleware, adminController.modifyPassword);

router.get('/recrutement', authorizationMiddleware, (req, res) => {
res.json({message : "ok on a le token !"})
});

router.get("/logout", authorizationMiddleware, (_, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
});


module.exports = router;
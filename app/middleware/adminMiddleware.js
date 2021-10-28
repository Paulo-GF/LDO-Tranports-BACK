const adminMiddleware = {

    isAdmin: function (req, res, next){
        
        console.log("-  isAdmin");
        console.log(req.session.user);

        // This is a test of user connection and if user role is admin
        if(req.session.user && req.session.user.role == "admin"){
            next();
        }
        else{
            // Send error 403 forbidden if role not allowed
            return res.status(403).json("Accès refusé, veuillez contacter l'administrateur");
        }
    }
};

module.exports = adminMiddleware;


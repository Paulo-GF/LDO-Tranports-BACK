const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    try {

        let token = '';
        if (req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.Authorization.split(' ')[1];
            console.log(token);

            if (!token) {
                return res.status(403).json({ message: token, message2: "ahaha pas de token !" });
            } else {
                const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
                console.log(data);
                req.userId = data.userId;
                req.userMail = data.userMail;
                req.userRole = data.userRole;
                next();
            }
        }
        
    } catch (error) {
        res.status(403).json({ message: token, message2: "on est dans le catch" });
    }


    // jsonwebtoken.verify(token, jwtSecret, (err, user) => {
    //     if (err) {
    //         return res.sendStatus(401);
    //     }
    //     req.user = user;
    //     next();
    // });


};

module.exports = authorization;
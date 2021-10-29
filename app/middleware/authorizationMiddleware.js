const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    try {

        
        if (req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.Authorization.split(' ')[1];
            console.log(token);

            if (!token) {
                return res.status(403).json({ message: token, message2: "ahaha pas de token !" });
            } 

            const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            console.log(data);
            req.userId = data.userId;
            req.userMail = data.userMail;
            req.userRole = data.userRole;
        }
        
    } catch (error) {
        res.status(403).json({ message: token, message2: "on est dans le catch" });
    }
    
    next();

};

module.exports = authorization;
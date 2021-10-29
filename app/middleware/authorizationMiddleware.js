const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    let token;
    if (req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer') {
       return token = req.headers.Authorization.split(' ')[1];
    }
    
    if (!token) {
        res.status(403).json({ message: token, message2: "ahaha pas de token !" });
        return;
    }

    try {
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(data);
        req.userId = data.userId;
        req.userMail = data.userMail;
        req.userRole = data.userRole;
        
    } catch (error) {
        res.status(403).json({ message: token, message2: "on est dans le catch"});
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
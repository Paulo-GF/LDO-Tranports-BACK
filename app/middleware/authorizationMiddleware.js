const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    console.log(req)
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
       return token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(403).json({ message: token, message2: "ahaha pas de token !" });
    }

    const data = jsonwebtoken.verify(token, jwtSecret);
    console.log(data);
    req.userId = data.userId;
    req.userMail = data.userMail;
    req.userRole = data.userRole;
    
    next();

};

module.exports = authorization;
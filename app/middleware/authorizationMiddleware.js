const jsonwebtoken = require('jsonwebtoken');

const authorization = (req, res, next) => {
    console.log(req)
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
       }
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jsonwebtoken.verify(token, jwtSecret);
      req.userId = data.userId;
      req.userMail = data.userMail;
      req.userRole = data.userRole;
      return next();
    } catch {
      return res.sendStatus(403).json({message : token});
    }
  };

module.exports = authorization;
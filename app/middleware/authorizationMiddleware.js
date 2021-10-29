const jsonwebtoken = require('jsonwebtoken');

const authorization = (req, res, next) => {
    console.log(req)
    const token = req.headers.authorization;
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
      return res.sendStatus(403);
    }
  };

module.exports = authorization;
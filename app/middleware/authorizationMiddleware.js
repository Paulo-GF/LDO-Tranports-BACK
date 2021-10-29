const jsonwebtoken = require('jsonwebtoken');

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
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
const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jsonwebtoken.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json("Le Token n'est pas valide");
            } else {
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json("Le Token est requis");
    }

};

module.exports = authorization;
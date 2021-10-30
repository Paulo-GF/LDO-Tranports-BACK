// Middleware for check token from front app
const jsonwebtoken = require('jsonwebtoken');

//const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    // Retrieve token from headers
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // If there is a token, slice it to discard "Bearer " and keep only a token
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        // Verify token with secret and put result in decoded or error if wrong token
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json("Le Token n'est pas valide");
            } else {
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // No headers -> no token -> status(403) - Forbidden
        return res.status(403).json("Le Token est requis");
    }

};

module.exports = authorization;
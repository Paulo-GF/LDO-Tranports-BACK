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

            // const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);

            
            jsonwebtoken.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).json('token_not_valid');
                } else {
                    req.decoded = decoded;
                    next();
                }

            });

            // req.userId = data.userId;
            // req.userMail = data.userMail;
            // req.userRole = data.userRole;

            // jsonwebtoken.verify(token, jwtSecret, (err, user) => {
            //     console.log(user);
            //     if (err) {
            //         return res.sendStatus(401);
            //     }
            //     req.user = user;
            //     next();
            // });
        }

    } catch (error) {
        res.status(403).json({ message: token, message2: "on est dans le catch" });
    }

    //next();

};

module.exports = authorization;
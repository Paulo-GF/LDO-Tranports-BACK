require('dotenv').config();
//const jwt = require('express-jwt');
//const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express');

const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

//app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X_Token, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // response to preflight request
    if (req.method === 'OPTIONS') {
         res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const jwtSecret = process.env.JWT_SECRET;


/* Router */
app.use(router);

/* JSON WEB TOKEN */
//app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

// app.use(
//   jwt({
//     secret: jwtSecret,
//     algorithms: ['HS256'],
//     getToken: req => req.cookies.token
//   })
// );


/* Serveur connection */
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

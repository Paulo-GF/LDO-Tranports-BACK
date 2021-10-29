require('dotenv').config();
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express');

const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

app.use(cookieParser())

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* JSON WEB TOKEN */
const jwtSecret = process.env.JWT_SECRET;

app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    getToken: req => req.cookies.token
  })
);

/* Router */
app.use(router);

/* Serveur connection */
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
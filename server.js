require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionSuccessStatus: 200
}
//app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* Manage session */
const session = require("express-session");
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 * 60) // this make one hour
    }
}));

// cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

    next();
});
app.use(cors());

app.use(router);


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
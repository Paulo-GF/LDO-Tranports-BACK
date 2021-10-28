require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

app.use(cors('*'));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

/* Manage session */
const session = require("express-session");
app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true,
    cookie: {
        secure: false,
        maxAge: (1000*60*60) // this make one hour
      }
}));

app.use(router);


app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});
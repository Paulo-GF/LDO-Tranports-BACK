require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

app.use(cors());

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

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // response to preflight request
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    }
    else {
      next();
    }
  });

app.use(router);


app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});
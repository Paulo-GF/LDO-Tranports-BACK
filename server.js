require('dotenv').config();

const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(router);

app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});
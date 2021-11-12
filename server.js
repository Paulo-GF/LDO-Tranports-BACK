require('dotenv').config();
const sanitizer = require('./app/middleware/sanitizer');
const cors = require('cors');
const express = require('express');

const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3500;

app.use(cors({
    origin: ['https://ldo-transports.netlify.app','http://localhost:8080', 'https://ldo-transport.netlify.app']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ldo-transports.netlify.app', 'http://localhost:8080', 'https://ldo-transport.netlify.app');
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

app.use(sanitizer);

/* Router */
app.use(router);

/* Serveur connection */
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

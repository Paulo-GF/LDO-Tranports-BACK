const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        // on demande à accepter le fait de ne pas être en ssl
        rejectUnauthorized: false
    }
});
module.exports = pool;
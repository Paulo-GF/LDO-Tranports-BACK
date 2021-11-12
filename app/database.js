const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        // we ask to accept the fact of not being in ssl
        rejectUnauthorized: false
    }
});
module.exports = pool;
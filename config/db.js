// db.js
const { Pool } = require('pg');
const config = require('../config/config.js');

// Connect to the PostgreSQL database using the 'pg' library.
const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    max: config.DB_MAX_CONNECTIONS,
    idleTimeoutMillis: 30000
});

module.exports = pool;
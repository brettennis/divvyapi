const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    // user: 'brettennis',
    // password: 'password',
    // host: 'localhost',
    // port: 5432,
    // database: 'divvy',
})

module.exports = pool;
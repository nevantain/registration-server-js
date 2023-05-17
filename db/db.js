const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'K10Sgg5',
    host: 'localhost',
    port: 5432,
    database: 'node_app_users'
});



module.exports = pool;
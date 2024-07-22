const { Pool } = require('pg');

const pool = new Pool({
    user: 'keyinstudent',  
    host: 'localhost',
    database: 'inventory',
    password: 'Tiger@1214', 
    port: 5432,  // Default PostgreSQL port
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

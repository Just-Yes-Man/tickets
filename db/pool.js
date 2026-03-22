const { Pool } = require('pg');

const {
 PGHOST = 'localhost',
 PGPORT = '5432',
 PGDATABASE = 'tickets',
 PGUSER = 'postgres',
 PGPASSWORD = 'postgres',
 PGSSL = 'false'
} = process.env;

const ssl = PGSSL === 'true' ? { rejectUnauthorized: false } : false;

const pool = new Pool({
 host: PGHOST,
 port: Number(PGPORT),
 database: PGDATABASE,
 user: PGUSER,
 password: PGPASSWORD,
 ssl
});

module.exports = pool;

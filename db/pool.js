const { Pool } = require('pg');

const {
 DATABASE_URL,
 PGHOST,
 PGPORT = '5432',
 PGDATABASE,
 PGUSER,
 PGPASSWORD,
 PGSSL = 'false'
} = process.env;

const hasDiscreteConfig = PGHOST && PGDATABASE && PGUSER;

if (!DATABASE_URL && !hasDiscreteConfig) {
 throw new Error(
  'Configura DATABASE_URL o las variables PGHOST, PGDATABASE y PGUSER para conectar PostgreSQL.'
 );
}

const pool = hasDiscreteConfig
 ? new Pool({
   host: PGHOST,
   port: Number(PGPORT),
   database: PGDATABASE,
   user: PGUSER,
   password: PGPASSWORD,
   ssl: PGSSL === 'true' ? { rejectUnauthorized: false } : false
  })
 : new Pool({
   connectionString: DATABASE_URL,
   ssl: { rejectUnauthorized: false }
  });

pool.on('error', (error) => {
 console.error('Error inesperado en el pool de PostgreSQL:', error.message);
});

module.exports = pool;

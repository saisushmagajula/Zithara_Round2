const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project_database',
  password: '123456',
  port: 5432,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database: ', err);
  }
};

module.exports = { pool, connect };

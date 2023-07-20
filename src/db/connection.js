const mysql = require('mysql2/promise');

const { env } = process;

const connection = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_NAME,
  waitForConnections: env.MYSQL_WAIT_FOR_CONNECTIONS,
  connectionLimit: env.MYSQL_CONNECTION_LIMIT,
  queueLimit: env.MYSQL_QUEUE_LIMITs
});

module.exports = connection;
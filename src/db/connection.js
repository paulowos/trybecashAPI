const mysql = require('mysql2/promise');

const { env } = process;

const connection = mysql.createPool({
  host: env.MYSQL_HOST || 'localhost',
  port: env.MYSQL_PORT || 3306,
  user: env.MYSQL_USER || 'root',
  password: env.MYSQL_PASSWORD || 'root',
  database: env.DB_NAME || 'trybecashdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
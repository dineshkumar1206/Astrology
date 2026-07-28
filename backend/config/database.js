const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const isProduction = process.env.NODE_ENV === 'production' || 
                     (DB_USER && DB_USER.startsWith('amigoweb_'));

const dbPort = parseInt(DB_PORT || '3306', 10);

let resolvedDbName = DB_NAME || 'sara-tarot-DB';
const dbUser = DB_USER || 'root';

// Auto-prepend amigoweb_ prefix to database name if it was omitted in environment variables
if (dbUser.startsWith('amigoweb_') && !resolvedDbName.startsWith('amigoweb_')) {
  resolvedDbName = `amigoweb_${resolvedDbName}`;
}

const sequelize = new Sequelize(
  resolvedDbName,
  dbUser,
  DB_PASSWORD || '',
  {
    host: DB_HOST || '127.0.0.1',
    port: dbPort,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    define: {
      timestamps: true
    }
  }
);

module.exports = sequelize;

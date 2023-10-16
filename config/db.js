require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_NAME,
  password: process.env.MYSQL_PASSWORD,
});

const sqlUsers = "SELECT * FROM NewTable";
const sqlDeals = "SELECT * FROM dealsInfo";

pool.query(sqlUsers, function (err, usersResult) {
  if (err) {
    throw err;
  }
});
pool.query(sqlDeals, function (err, dealsResult) {
  if (err) {
    throw err;
  }
});

module.exports = pool;

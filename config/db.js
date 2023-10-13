require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_NAME,
  password: process.env.MYSQL_PASSWORD,
});

const sql = "SELECT * FROM NewTable";

pool.query(sql, function (err, result) {
  if (err) {
    throw err;
  }
});

module.exports = pool;

// sdsd

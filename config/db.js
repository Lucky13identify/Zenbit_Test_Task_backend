require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_NAME,
  password: process.env.MYSQL_PASSWORD,
  port: "/tmp/mysql.sock    ",
});

// /tmp/mysql.sock
const sql = "SELECT * FROM NewTable";

pool.query(sql, function (err, result) {
  if (err) {
    throw err;
  }
});

module.exports = pool;

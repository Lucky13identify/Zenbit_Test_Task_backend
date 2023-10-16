const db = require("../config/db");

const isUserInTableRegister = async (req, res, next) => {
  const { body } = req;

  const result = await db.query(
    "SELECT COUNT(*) as count FROM NewTable WHERE email = ?",
    [body.email],
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        console.log("Email уже есть в таблице");
      }

      const count = results[0].count;

      if (count === 0) {
        next();
      }
    }
  );
  return result;
};

module.exports = isUserInTableRegister;

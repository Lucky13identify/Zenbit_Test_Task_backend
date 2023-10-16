const db = require("../config/db");

const isUserInTableLogin = async (req, res, next) => {
  const { body } = req;

  const result = await db.query(
    "SELECT COUNT(*) as count FROM NewTable WHERE email = ?",
    [body.email],
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        next();
      }
    }
  );
  return result;
};

module.exports = isUserInTableLogin;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const { HttpError, ctrlWrapper } = require("../helpers");

const { JWT_SECRET } = process.env;

// Login controller

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM NewTable WHERE email = ?",
    [email],
    (error, results, fields) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);

        return;
      }

      if (results.length > 0) {
        const user = results[0];
        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          throw HttpError(401, "Email or password invalid");
        }

        const payload = {
          id: user.id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        res.json({
          email,
          token,
        });
        console.log("Данные пользователя:", user.password);
      } else {
        console.log("Пользователь не найден");
      }
    }
  );
};

// Register controller

const register = async (req, res) => {
  const { email, password } = req.body;
  const payload = { email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const sql = `INSERT INTO NewTable (email, password, token) VALUES ('${email}', '${password}', '${token}')`;
  try {
    const result = await db.query(sql);

    res.json({
      email,
      password,
      token,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout controller

const logout = async (req, res) => {
  res.json({ message: "Logout success" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};

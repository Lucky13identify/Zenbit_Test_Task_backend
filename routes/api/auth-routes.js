const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth-controller");
const {
  isUserInTableRegister,
  isUserInTableLogin,
} = require("../../middlewares");

// SignUp
router.post("/register", isUserInTableRegister, ctrl.register);

// SignIn
router.post("/login", isUserInTableLogin, ctrl.login);

// Logout
router.post("/logout", ctrl.logout);

module.exports = router;

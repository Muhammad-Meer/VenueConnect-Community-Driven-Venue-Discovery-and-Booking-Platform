const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

module.exports = router;
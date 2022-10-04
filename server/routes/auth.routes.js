const { Router } = require("express");
const router = Router();

const AuthMiddleware = require("../middlewares/auth.middleware");
const AuthService = require("../services/auth.service");

const authMiddleware = new AuthMiddleware();
const authService = new AuthService();

// Register route
router.post("/register", authMiddleware.register, async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// Login route
router.post("/login", authMiddleware.login, async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// Admin login
router.post("/admin", authMiddleware.admin, async (req, res) => {
 try {
  const result = await authService.admin(req.body)

  res.json(result)
 } catch (error) {
    console.log(error.message);
 }
});

module.exports = router;

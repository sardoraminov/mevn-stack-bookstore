const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password, fullname, gender } = req.body;
    if (!username || !password || !fullname || !gender) {
      return res.json({
        status: "bad",
        msg: "Hamma qatorlarni to'ldiring",
      });
    }

    if (username.length < 4) {
      return res.json({
        status: "bad",
        msg: "Username kamida 4 ta belgidan tashkil topishi kerak!",
      });
    }

    if (username.length > 20) {
      return res.json({
        status: "bad",
        msg: "Username 20 ta belgidan oshmasligi kerak!",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: "bad",
        msg: "Parol kamida 8 ta belgidan tashkil topishi kerak!",
      });
    }

    const existUser = await User.findOne({ username });

    if (existUser) {
      return res.json({
        status: "bad",
        msg: "Bu username allaqachon tizimda mavjud. Iltimos, boshqasini tanlang",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      password: hashedPass,
      fullname,
      gender
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ user: existUser }, "tokensecret");

    res.json({
      status: "ok",
      msg: "Muvafaqqiyatli ro'yxatdan o'tdingiz!",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        status: "bad",
        msg: "Hamma qatorlarni to'ldiring",
      });
    }

    const existUser = await User.findOne({ username });

    if (!existUser) {
      return res.json({
        status: "bad",
        msg: "Siz kiritgan username bo'yicha hech qanday account topilmadi!",
      });
    }

    const comparedPass = await bcrypt.compare(password, existUser.password);

    if (!comparedPass) {
      return res.json({
        status: "bad",
        msg: "Parol noto'g'ri kiritildi!",
      });
    }

    const token = await jwt.sign({ user: existUser }, "tokensecret");

    res.json({
      status: "ok",
      msg: "Tizimga muvafaqqiyatli kirdingiz!",
      user: existUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

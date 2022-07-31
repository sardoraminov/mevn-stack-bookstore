const Router = require("express").Router();
const User = require("../models/User");
const { checkUser, checkAdmin } = require("../middlewares/checkToken");
const jwt = require("jsonwebtoken");
const router = Router;

// update account
router.put("/:id", checkUser, async (req, res) => {
  try {
    const { username } = req.body.account;
    const token = req.headers.authorization?.split(" ")[1];
    const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);
    if (
      currentUser._id.toString() !== decodedUser.user._id &&
      decodedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "Sizda boshqalarni akkauntini o'zgartirishga huquq yo'q!",
      });
    }

    const existUserWithUsername = await User.findOne({ username });

    if (
      existUserWithUsername &&
      existUserWithUsername._id.toString() !== decodedUser.user._id
    ) {
      return res.json({
        status: "bad",
        msg: "Bu username oldin ishlatilgan, iltimos boshqasini tanlang!",
      });
    }

    if (username !== process.env.ADMIN_LOGIN) {
      return res.json({
        status: "bad",
        msg: "Bu usernamedan foydalanish mumkin emas!",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.account,
      },
      { new: true }
    );

    res.json({
      status: "ok",
      msg: "Akkaunt yangilandi!",
      account: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// get user
router.get("/:id", checkUser, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);
    if (
      currentUser._id.toString() !== decodedUser.user._id &&
      decodedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "Sizning boshqalarni akkauntini ko'rishga huquqingiz yo'q!",
      });
    }
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ status: "bad", msg: "Akkaunt topilmadi!" });
    }

    res.json({ status: "ok", account: user });
  } catch (error) {
    console.log(error.message);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);
    if (
      currentUser._id.toString() !== decodedUser.user._id &&
      decodedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "Sizning boshqalarni akkauntini o'chirishga huquqingiz yo'q!",
      });
    }
    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "Akkaunt o'chirildi!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

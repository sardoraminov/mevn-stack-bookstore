const Router = require("express").Router();
const User = require("../models/User");
const router = Router;

// update account
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
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
router.get("/:id", async (req, res) => {
  try {
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
    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "Akkaunt o'chirildi!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

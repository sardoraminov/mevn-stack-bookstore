const User = require("../models/User");

class AccountService {
  async update(data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        data.id,
        {
          $set: data.account,
        },
        { new: true }
      );

      return {
        status: "ok",
        msg: "Akkaunt yangilandi!",
        account: updatedUser,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUser(id) {
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.json({ status: "bad", msg: "Akkaunt topilmadi!" });
      }

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await User.find();

      if (!users) {
        return res.json({ status: "bad", msg: "Ma'lumot topilmadi!" });
      }

      return users;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);

      return { status: "ok", msg: "Akkaunt o'chirildi!" };
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AccountService;

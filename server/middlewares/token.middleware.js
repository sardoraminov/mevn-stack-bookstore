const jwt = require("jsonwebtoken");
const User = require("../models/User");

class TokenMiddleware {
  async checkUser(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.json({ status: "bad", msg: "Token not found" });
      }

      const decodedToken = await jwt.decode(
        token,
        process.env.TOKEN_KEYWORD,
        (err) => {
          if (err) {
            return res.json({
              status: "bad",
              msg: "Unauthorized or invalid token",
            });
          }
        }
      );

      if (!decodedToken) {
        return res.json({ status: "bad", msg: "Unauthorized" });
      }

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async checkAdmin(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.json({ status: "bad", msg: "Token not found" });
      }

      const decodedToken = await jwt.decode(
        token,
        process.env.ADMIN_KEYWORD,
        (err) => {
          if (err) {
            return res.json({
              status: "bad",
              msg: "Unauthorized or invalid token",
            });
          }
        }
      );

      if (!decodedToken) {
        return res.json({ status: "bad", msg: "Unauthorized" });
      }

      if (decodedToken.user.username !== "dasturchioka") {
        return res.json({
          status: "bad",
          msg: "Siz admin emassiz. Bu resursdan foydalanish uchun sizda huquq yo'q",
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async checkAll(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.json({ status: "bad", msg: "Token not found" });
      }

      const decodedAsAdminToken = await jwt.decode(
        token,
        process.env.ADMIN_KEYWORD
      );
      const decodedAsUserToken = await jwt.decode(
        token,
        process.env.TOKEN_KEYWORD
      );

      if (!decodedAsAdminToken || !decodedAsUserToken) {
        return res.json({ status: "bad", msg: "Unauthorized" });
      }

      decodedAsAdminToken
        ? (req.admin = decodedAsAdminToken.admin)
        : (req.user = decodedAsUserToken.user);

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async checkPrivacy(req, res, next) {
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
          msg: "Sizda boshqalarni akkauntini o'zgartirishga & o'chirishga huquq yo'q!",
        });
      }

      next()
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = TokenMiddleware;

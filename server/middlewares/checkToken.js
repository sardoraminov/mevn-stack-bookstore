const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ status: "bad", msg: "Token not found" });
    }

    const decodedToken = await jwt.decode(token, "tokensecret", (err) => {
      if (err) {
        return res.json({
          status: "bad",
          msg: "Unauthorized or invalid token",
        });
      }
    });

    if (!decodedToken) {
      return res.json({ status: "bad", msg: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.json({ status: "bad", msg: "Token not found" });
    }

    const decodedToken = await jwt.decode(token, "tokensecret", (err) => {
      if (err) {
        return res.json({
          status: "bad",
          msg: "Unauthorized or invalid token",
        });
      }
    });

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
};

module.exports = { checkUser, checkAdmin };

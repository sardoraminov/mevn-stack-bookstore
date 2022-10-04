const Router = require("express").Router();
const router = Router;

const AccountService = require("../services/accounts.service");
const TokenMiddleware = require("../middlewares/token.middleware");
const AccountMiddleware = require("../middlewares/account.middleware");

const { checkAll, checkPrivacy, checkAdmin } = new TokenMiddleware();
const { update } = new AccountMiddleware();
const accountService = new AccountService();

// get all users
router.get("/", checkAdmin, async (req, res) => {
  try {
    const result = await accountService.getUsers();

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// update account
router.put("/:id", checkAll, checkPrivacy, update, async (req, res) => {
  try {
    const result = await accountService.update({
      id: req.params.id,
      account: req.body.account,
    });

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// get user
router.get("/:id", checkAll, checkPrivacy, async (req, res) => {
  try {
    const result = await accountService.getUser(req.params.id);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// delete user
router.delete("/:id", checkAll, checkPrivacy, async (req, res) => {
  try {
    const result = await accountService.deleteUser(req.params.id);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

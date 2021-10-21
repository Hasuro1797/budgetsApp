const { Router } = require("express");
const authRouter = require("./auth.js");
const balanceRouter = require("./balance");

const router = Router();

router.use("/auth", authRouter);
router.use("/budget", balanceRouter);

module.exports = router;

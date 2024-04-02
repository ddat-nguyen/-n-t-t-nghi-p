const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/tables", require('./table'));
module.exports = router
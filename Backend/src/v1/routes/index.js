const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/tables", require('./table'));
router.use("/category", require('./category'))
module.exports = router
const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/tables", require('./table'));
router.use("/category", require('./category'));
router.use("/food-items", require('./foodItem'));
router.use("/review", require("./review"));
router.use("/cart", require('./cart'));
router.use("/reservation", require('./reservation'));
router.use("/order", require('./order'));
module.exports = router
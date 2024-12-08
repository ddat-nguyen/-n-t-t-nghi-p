const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/tokenHandler");
const checkoutController = require("../controllers/payment");
const zaloController = require("../controllers/zalopay");
// const { zaloPay, callBack } = require('../controllers/zalopay');


router.post("/create-checkout-session",verifyToken, checkoutController.createCheckoutSession);
router.post("/stripe_webhooks", checkoutController.handleWebhook);
router.post("/zalopay", zaloController.zaloPay);
router.post("/callback", zaloController.callBack);
router.post("/momopay", zaloController.momoPay);
router.post("/callback-momo", zaloController.callBackMomo);
module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/tokenHandler");
const checkoutController = require("../controllers/payment");

router.post("/create-checkout-session",verifyToken, checkoutController.createCheckoutSession);
router.post("/stripe_webhooks", checkoutController.handleWebhook);

module.exports = router;

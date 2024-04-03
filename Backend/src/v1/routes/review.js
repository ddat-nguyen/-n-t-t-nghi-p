const router = require('express').Router();
const {verifyToken} = require('../middleware/tokenHandler');
const { createReview, getReviewByProduct, checkPurchaseStatus } = require('../controllers/review');

router.post("/:id", verifyToken, createReview);
router.get("/:id", getReviewByProduct);
router.get("/check/:id", verifyToken, checkPurchaseStatus)
module.exports = router
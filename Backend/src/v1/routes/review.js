const router = require('express').Router();
const {verifyToken} = require('../middleware/tokenHandler');
const { createReview, getReviewByProduct, checkPurchaseStatus, likeReview } = require('../controllers/review');

router.post("/:id", verifyToken, createReview);
router.get("/:id", getReviewByProduct);
router.get("/check/:id", verifyToken, checkPurchaseStatus)
router.post("/like/:reviewID", verifyToken,likeReview )
module.exports = router
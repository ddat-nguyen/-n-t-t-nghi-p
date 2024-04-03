const router = require('express').Router();
const {verifyToken} = require('../middleware/tokenHandler');
const { createReview, getReviewByProduct, checkPurchaseStatus, likeReview, dislikeReview } = require('../controllers/review');

router.post("/:id", verifyToken, createReview);
router.get("/:id", getReviewByProduct);
router.get("/check/:id", verifyToken, checkPurchaseStatus)
router.post("/like/:reviewID", verifyToken,likeReview)
router.post("/dislike/:reviewID", verifyToken, dislikeReview)
module.exports = router
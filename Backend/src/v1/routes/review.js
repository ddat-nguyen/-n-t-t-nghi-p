const router = require('express').Router();
const {verifyToken} = require('../middleware/tokenHandler');
const { createReview, getReviewByProduct } = require('../controllers/review');

router.post("/:id", verifyToken, createReview)
router.get("/:id", getReviewByProduct)
module.exports = router
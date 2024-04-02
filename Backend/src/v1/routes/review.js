const router = require('express').Router();
const {verifyToken} = require('../middleware/tokenHandler');
const { createReview } = require('../controllers/review');

router.post("/:id", verifyToken, createReview)
module.exports = router
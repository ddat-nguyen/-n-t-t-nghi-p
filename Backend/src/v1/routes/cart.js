const { addToCart } = require('../controllers/cart');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.post("/:id/:qty", verifyToken, addToCart)
module.exports = router

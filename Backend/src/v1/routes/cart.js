const { addToCart, allCartItem, editCart } = require('../controllers/cart');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", verifyToken, allCartItem)
router.post("/:id/:qty", verifyToken, addToCart)
router.put("/:foodItemForUpdate/qty/:qty", verifyToken, editCart)

module.exports = router

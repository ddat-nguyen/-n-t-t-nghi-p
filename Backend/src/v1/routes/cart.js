const { addToCart, allCartItem, editCart, removeFromCart, getMostOrderedFoodsToday } = require('../controllers/cart');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", verifyToken, allCartItem)
router.post("/:id/:qty", verifyToken, addToCart)
router.put("/:foodItemForUpdate/qty/:qty", verifyToken, editCart)
router.delete("/:id", verifyToken, removeFromCart)
router.get("/most-order-today", verifyToken, getMostOrderedFoodsToday)

module.exports = router

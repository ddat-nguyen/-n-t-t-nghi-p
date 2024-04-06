const { addToCart, allCartItem, editCart, removeFromCart, getMostOrderedFoodsToday, getMostOrderedFoodsThisWeek, getMostOrderedFoodsTodayAdmin, getMostOrderedFoodsThisWeekAdmin, getMostOrderedFoodsAllTime } = require('../controllers/cart');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", verifyToken, allCartItem)
router.post("/:id/:qty", verifyToken, addToCart)
router.put("/:foodItemForUpdate/qty/:qty", verifyToken, editCart)
router.delete("/:id", verifyToken, removeFromCart)
router.get("/most-order-today", verifyToken, getMostOrderedFoodsToday)
router.get("/most-order-week", verifyToken, getMostOrderedFoodsThisWeek)
router.get("/most-ordered-all-time", verifyToken, getMostOrderedFoodsAllTime);

router.get("/most-order-today-admin", verifyToken, getMostOrderedFoodsTodayAdmin)
router.get("/most-order-week-admin", verifyToken, getMostOrderedFoodsThisWeekAdmin)

module.exports = router

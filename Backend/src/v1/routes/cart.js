const { addToCart, allCartItem, editCart, removeFromCart, getMostOrderedFoodsToday, getMostOrderedFoodsThisWeek, getMostOrderedFoodsTodayAdmin, getMostOrderedFoodsThisWeekAdmin, getMostOrderedFoodsAllTime, getMostOrderedFoodsAllTimeAdmin, editMessage } = require('../controllers/cart');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", verifyToken, allCartItem)
router.post("/:id/:qty", verifyToken, addToCart)
router.put("/:id/message/", verifyToken, editMessage);
router.put("/:foodItemForUpdate/qty/:qty", verifyToken, editCart)
router.delete("/:id", verifyToken, removeFromCart)
router.get("/most-order-today", verifyToken, getMostOrderedFoodsToday)
router.get("/most-order-week", verifyToken, getMostOrderedFoodsThisWeek)
router.get("/most-ordered-all-time", verifyToken, getMostOrderedFoodsAllTime);

router.get("/most-order-today-admin", verifyToken, getMostOrderedFoodsTodayAdmin)
router.get("/most-order-week-admin", verifyToken, getMostOrderedFoodsThisWeekAdmin)
router.get("/most-ordered-all-time-admin", verifyToken, getMostOrderedFoodsAllTimeAdmin);

module.exports = router

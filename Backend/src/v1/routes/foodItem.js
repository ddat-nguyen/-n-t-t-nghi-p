const { getAllFoodItems, createFoodItem, updateFoodItem, deleteFoodItem } = require('../controllers/foodItem');
const {verifyToken} = require('../middleware/tokenHandler');
const router = require('express').Router();
router.get("/", getAllFoodItems);

router.put("/:id", verifyToken, updateFoodItem);
router.post("/", verifyToken, createFoodItem);
router.delete("/:id", verifyToken, deleteFoodItem);
module.exports = router
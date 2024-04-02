const { getAllFoodItems, createFoodItem, updateFoodItem } = require('../controllers/foodItem');
const {verifyToken} = require('../middleware/tokenHandler');
const router = require('express').Router();
router.get("/", getAllFoodItems);

router.put("/:id", verifyToken, updateFoodItem);
router.post("/", verifyToken, createFoodItem);

module.exports = router
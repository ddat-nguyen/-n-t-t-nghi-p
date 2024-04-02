const { getAllFoodItems, createFoodItem } = require('../controllers/foodItem');
const {verifyToken} = require('../middleware/tokenHandler');
const router = require('express').Router();
router.get("/", getAllFoodItems);
router.post("/", verifyToken, createFoodItem);

module.exports = router
const { getAllFoodItems } = require('../controllers/foodItem');

const router = require('express').Router();
router.get("/", getAllFoodItems);
module.exports = router
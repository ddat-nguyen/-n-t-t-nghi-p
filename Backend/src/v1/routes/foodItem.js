const { param } = require('express-validator');
const { getAllFoodItems, createFoodItem, updateFoodItem, deleteFoodItem, addWishList, getFoodItemById } = require('../controllers/foodItem');
const {verifyToken} = require('../middleware/tokenHandler');
const { validate } = require('../middleware/validate');
const router = require('express').Router();

router.get("/", getAllFoodItems);
router.get("/:id",verifyToken, param("id").isMongoId().withMessage("Invalid food item id"), getFoodItemById);


router.put("/:id", verifyToken, param("id").isMongoId().withMessage("Invalid food item id"), validate, updateFoodItem);
router.post("/", verifyToken, validate,createFoodItem);
router.post("/:id/wishlist",verifyToken,param("id").isMongoId().withMessage("Invalid food item id"), validate, addWishList)
router.delete("/:id", verifyToken, param("id").isMongoId().withMessage("Invalid food item id"), validate, deleteFoodItem);
module.exports = router
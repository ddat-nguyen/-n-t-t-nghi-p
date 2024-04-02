const FoodItem = require("../models/foodItem");

const getAllFoodItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const foodItems = await FoodItem.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "reviews",
        select: "rating",
      });
    return res.status(200).json({
      success: true,
      data: foodItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
    getAllFoodItems
}

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

const createFoodItem = async (req, res) => {
  const {name, description, price, category, image, quantity} = req.body;
  try {
    const foodItem = await FoodItem.create({
      name, 
      description,
      price,
      category,
      image, 
      quantity
    })

    return res.status(201).json({
      success: true,
      data: foodItem
    })
  } catch (error) {
    console.error(err);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
  }
}

const updateFoodItem = async (req, res) => {
  const {id} = req.params;
  try {
    const foodItem = await FoodItem.findById(id)
    if (!foodItem) {
      return res.status(404).json({
        success: false, 
        message: "Food item not found",
      })
    }
    const data = await FoodItem.findByIdAndUpdate(id, {$set: {...req.body}}, {new: true})
    
    return res.status(200).json({
      success: true,
      message: "Updated food item",
      data: data
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const deleteFoodItem = async (req, res) => {
  const {id} = req.params
  try {
    const foodItem = await FoodItem.findByIdAndDelete(id);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      })
    }
    return res.status(200).json({
      success: true,
      data: foodItem._id,
      message: "Food item deleted successfully"
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

module.exports = {
    getAllFoodItems,
    createFoodItem,
    updateFoodItem, 
    deleteFoodItem
}

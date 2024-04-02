const FoodItem = require('../models/foodItem');
const Review = require('../models/review');
const User = require('../models/user');

const createReview = async (req, res) => {
    const {rating, comment} = req.body;
    const {id} = req.params;
    const userID = req.user._id;

    try {
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "food item not found"
            }); 
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            }); 
        }

        const newReview = new Review({
            userID: userID,
            foodItemID: id,
            rating,
            comment    
        })

        await newReview.save();

        // adding review to product 
        foodItem.reviews.push(newReview._id);
        await foodItem.save();

        // get user' info in return value
        await newReview.populate("userID", "username avatar");

        return res.status(201).json({
            success: true,
            rating: newReview,
            message: "Added review" 
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createReview
}
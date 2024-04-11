const Comment = require('../models/comment');
const FoodItem = require('../models/foodItem');
const Review = require('../models/review');
// them comment 
const addComment = async (req, res, next) => {
    const {comment} = req.body;
    const foodItemID = req.params.id;
    const userID = req.user._id;

    // check foodItemID 
    const foodItem = await FoodItem.findById(foodItemID);
    if(!foodItem) {
        return res.status(404).json({
            success: false,
            message: "Food item not found",
        })
    }

    //check userId
    if (!userID) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //create new comment
    try {
        const newComment = new Comment({
            comment,
            foodItemID,
            userID,
        });
        await newComment.save();
        // them comment vao Review
        const review = await Review.findOne({ foodItemID });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }
        review.comments.push(newComment._id);
        await review.save();
        return res.status(201).json({
            success: true,
            message: "Add comment successfully",
            data: newComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    addComment
}
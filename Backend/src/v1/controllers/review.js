const FoodItem = require('../models/foodItem');
const Review = require('../models/review');
const User = require('../models/user');
const Cart = require('../models/cart');

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

const getReviewByProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const foodItem = await FoodItem.findById(id);
        if(!foodItem) {
            return res.status(404).json({
                success: false, 
                message: "Product not found"
            })
        }

        const reviews = await Review.find({id}).populate("userID", "username avatar").sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            data: reviews
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

const checkPurchaseStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const userID = req.user._id;
        if (!userID) {
            return res.status(404).json({
                purchased: false,
                reviewed: false,
                message: "User not found",
            });
        }
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                message: "Food item not found"
            })
        }

        const purchased = await Cart.findOne({
            userID: userID,
            foodID: id, 
            status: "delivered",            
        })
        const isPurchased = !!purchased;

        // check danh gia 
        if(isPurchased) {
            const review = await Review.findOne({
                userID, 
                foodItemID: id
            });
            if(review) {
                return res.status(200).json({
                    purchased: isPurchased,
                    reviewed: true,
                    message: "Purchased and reviewed"
                })
            }
        }
        return res.status(200).json({
            purchased: isPurchased,
            reviewed: false,
            message: isPurchased ? "Purchased" : "Not purchased"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createReview,
    getReviewByProduct,
    checkPurchaseStatus
}
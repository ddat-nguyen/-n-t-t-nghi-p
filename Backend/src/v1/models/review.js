const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    foodItemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    }, 
    comment: {
        type: String
    }, 
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},  {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review
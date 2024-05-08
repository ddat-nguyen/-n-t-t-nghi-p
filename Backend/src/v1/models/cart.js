/** @format */

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodItem",
            required: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        message: {
            type: String,
            default: "",
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered"],
            default: "pending",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
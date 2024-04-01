const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  foodID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "FoodItem",
  },
  quantity: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: "",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered"],
    default: "pending",
  },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
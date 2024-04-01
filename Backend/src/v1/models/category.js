const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, default: "Untitled" },
    position: {
      type: Number,
    },
    description: {
      type: String,
      default: "Thêm mô tả cho loại sản phẩm!",
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    status: {
      type: String,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
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

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

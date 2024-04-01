const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number, 
        unique: true,
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String, 
        enum: ["Available", "Reserved", "Occupied", "Closed"],
        default: "Available"
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
})

const Table = mongoose.model("Table", tableSchema)
module.exports = Table;
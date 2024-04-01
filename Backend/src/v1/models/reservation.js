const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    user_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date, // booking time 
        required: true,
    }, 
    time: {
        type: String, 
        required: true,
    },
    phone: {
      type: String, 
      required: true  
    }, 
    guests: {
        type: Number, 
        required: true
    }, 
    note: {
        type: String,
    }, 
    status: {
        type: String, 
        enum: ["Confirmed", "Unconfirmed", "Completed"],
        default: "Unconfirmed"
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

const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = Reservation
const Reservation = require('../models/reservation');

const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().sort({createdAt: -1}).populate({
            path: "user",
            select: "name"
        })        
        return res.status(200).json({
            success: true,
            data: reservations
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Internal server error"
        })
    }
}

const getReservationByID = async (req, res, next) => {
    try {
        const reservationID = req.params.id;
        const reservation = await Reservation.findById(reservationID).populate({
            path: "user",
            select: "name"
        }).populate({
            path: "cart",
            select: "name"
        });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: reservation
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Internal server error"
        })
    }
}
module.exports = {
    getAllReservations,
    getReservationByID
}
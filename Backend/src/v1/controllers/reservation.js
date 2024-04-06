const Reservation = require("../models/reservation");

const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "name",
            });
        return res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getReservationByID = async (req, res, next) => {
    try {
        const reservationID = req.params.id;
        const reservation = await Reservation.findById(reservationID)
            .populate({
                path: "user",
                select: "name",
            })
            .populate({
                path: "cart",
                select: "name",
            });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const createReservation = async (req, res, next) => {
    const { user, user_name, note, date, time, guests, phone } = req.body;
    
    try {
        const reservation = await Reservation.create({
            user,
            user_name,
            date,
            time,
            note,
            guests,
            phone,
            // status,
        });
        
        return res.status(201).json({
            success: true,
            message: "Create reservation successfully",
            data: reservation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateReservation = async (req, res) => {
    try {
        const {id} = req.params;
        const reservation = await Reservation.findByIdAndUpdate(id, {$set: {...req.body}, }, {new: true});
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }

        return res.status(200).json({
            success: false,
            message: "Reservation successfully updated",
            data: id,
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const deleteReservation = async (req, res) => {
    try {
        const {id} = req.params;
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }

        return res.status(200).json({
            success: false,
            message: "Reservation successfully deleted",
            data: id,
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
module.exports = {
    getAllReservations,
    getReservationByID,
    createReservation,
    updateReservation,
    deleteReservation
};

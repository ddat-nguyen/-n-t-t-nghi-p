const { getAllReservations, getReservationByID, createReservation, deleteReservation, updateReservation } = require("../controllers/reservation");
const {verifyToken} = require('../middleware/tokenHandler');
const router = require("express").Router();

router.get("/", getAllReservations)

router.get("/:id", verifyToken, getReservationByID)
router.post("/", verifyToken, createReservation)
router.put("/:id", verifyToken, updateReservation)
router.delete("/:id", verifyToken, deleteReservation)
module.exports = router;
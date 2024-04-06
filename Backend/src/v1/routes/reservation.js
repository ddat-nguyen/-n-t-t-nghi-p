const { getAllReservations, getReservationByID } = require("../controllers/reservation");
const {verifyToken} = require('../middleware/tokenHandler');
const router = require("express").Router();

router.get("/", getAllReservations)

router.get("/:id", verifyToken, getReservationByID)


module.exports = router;
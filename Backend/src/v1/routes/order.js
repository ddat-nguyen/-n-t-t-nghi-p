const { createOrder, getOrderByID, getAllOrders, getLatest } = require('../controllers/order');
const { verifyToken } = require('../middleware/tokenHandler');

const route = require('express').Router();

route.get("/latest", verifyToken, getLatest)
route.get("/:id", verifyToken, getOrderByID)
route.get("/", verifyToken, getAllOrders)
route.post("/", verifyToken, createOrder)
module.exports = route;
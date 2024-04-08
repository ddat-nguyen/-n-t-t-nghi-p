const { createOrder, getOrderByID, getAllOrders, getLatest, getAllOrdersAdmin } = require('../controllers/order');
const { verifyToken } = require('../middleware/tokenHandler');

const route = require('express').Router();

route.get("/", verifyToken, getAllOrders)
route.post("/", verifyToken, createOrder)
route.get("/latest", verifyToken, getLatest)
route.get("/admin", verifyToken, getAllOrdersAdmin)
route.get("/:id", verifyToken, getOrderByID)
module.exports = route;
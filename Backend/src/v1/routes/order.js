const { createOrder, getOrderByID, getAllOrders, getLatest, getAllOrdersAdmin, updateOrderStatus, getTopCustomersLastWeek } = require('../controllers/order');
const { verifyToken } = require('../middleware/tokenHandler');
const { validate } = require('../models/cart');

const route = require('express').Router();

route.get("/", verifyToken, getAllOrders)
route.post("/", verifyToken, createOrder)
route.get("/latest", verifyToken, getLatest)
route.get("/admin", verifyToken, getAllOrdersAdmin)
route.get("/top-customers", verifyToken, getTopCustomersLastWeek);
route.get("/:id", verifyToken, validate, getOrderByID)
route.put("/:id", verifyToken, updateOrderStatus)
module.exports = route;
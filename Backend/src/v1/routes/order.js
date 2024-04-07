const { createOrder, getOrderByID } = require('../controllers/order');
const { verifyToken } = require('../middleware/tokenHandler');

const route = require('express').Router();

route.post("/", verifyToken, createOrder)
route.get("/:id", verifyToken, getOrderByID)
module.exports = route;
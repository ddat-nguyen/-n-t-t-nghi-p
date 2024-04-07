const { createOrder } = require('../controllers/order');
const { verifyToken } = require('../middleware/tokenHandler');

const route = require('express').Router();

route.post("/", verifyToken, createOrder)

module.exports = route;
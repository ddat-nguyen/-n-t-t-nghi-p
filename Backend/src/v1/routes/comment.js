const route = require('express').Router();
const { addComment } = require('../controllers/comment');
const {verifyToken} = require('../middleware/tokenHandler');
route.post("/:id", verifyToken, addComment);
module.exports = route;
const { createCategory } = require('../controllers/category');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.post("/",verifyToken, createCategory)

module.exports = router
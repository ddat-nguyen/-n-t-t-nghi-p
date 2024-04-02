const { createCategory, updateCategory } = require('../controllers/category');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.post("/",verifyToken, createCategory)
router.put("/:id",verifyToken, updateCategory)
module.exports = router
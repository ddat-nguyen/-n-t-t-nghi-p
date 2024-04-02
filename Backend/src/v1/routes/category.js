const { createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.post("/",verifyToken, createCategory)
router.put("/:id",verifyToken, updateCategory)
router.delete("/:id", verifyToken, deleteCategory)
module.exports = router
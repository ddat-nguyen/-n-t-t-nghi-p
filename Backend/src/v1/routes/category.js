const { createCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/category');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", getCategories)
router.post("/",verifyToken, createCategory)
router.put("/:id",verifyToken, updateCategory)
router.delete("/:id", verifyToken, deleteCategory)
module.exports = router
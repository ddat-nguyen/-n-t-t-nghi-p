const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require('../controllers/category');
const { verifyToken } = require('../middleware/tokenHandler');

const router = require('express').Router();

router.get("/", getCategories)
router.get("/:id", verifyToken, getCategoryById)
router.post("/",verifyToken, createCategory)
router.put("/:id",verifyToken, updateCategory)
router.delete("/:id", verifyToken, deleteCategory)
module.exports = router
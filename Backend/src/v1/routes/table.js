const router = require('express').Router();
const { createTable, updateTableById, deleteTableById, getTables, getTableById } = require('../controllers/table');
const {verifyToken} = require('../middleware/tokenHandler');

router.get("/", getTables)
router.get("/:id", verifyToken, getTableById)
router.post("/", verifyToken, createTable);
router.put("/:id", verifyToken, updateTableById)
router.delete("/:id", verifyToken, deleteTableById)
module.exports = router;
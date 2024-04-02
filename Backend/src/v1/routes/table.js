const router = require('express').Router();
const { createTable, updateTableById, deleteTableById, getTables } = require('../controllers/table');
const {verifyToken} = require('../middleware/tokenHandler');

router.get("/", getTables)
router.post("/", verifyToken, createTable);
router.put("/:id", verifyToken, updateTableById)
router.delete("/:id", verifyToken, deleteTableById)
module.exports = router;
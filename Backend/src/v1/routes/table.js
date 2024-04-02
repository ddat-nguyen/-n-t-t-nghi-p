const router = require('express').Router();
const { createTable, updateTableById, deleteTableById } = require('../controllers/table');
const {verifyToken} = require('../middleware/tokenHandler');

router.post("/", verifyToken, createTable);
router.put("/:id", verifyToken, updateTableById)
router.delete("/:id", verifyToken, deleteTableById)
module.exports = router;
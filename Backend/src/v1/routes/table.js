const router = require('express').Router();
const { createTable, updateTableById } = require('../controllers/table');
const {verifyToken} = require('../middleware/tokenHandler');

router.post('/', verifyToken, createTable);
router.put("/:id", verifyToken, updateTableById)

module.exports = router;
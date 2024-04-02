const router = require('express').Router();
const { createTable } = require('../controllers/table');
const {verifyToken} = require('../middleware/tokenHandler');

router.post('/', verifyToken, createTable);

module.exports = router;
const Table = require('../models/table');
const createTable = async (req, res) => {
    const {table_number, capacity} = req.body;
    try {
        const newTable = new Table({
            table_number,
            capacity
        })
        await newTable.save();
        return res.status(201).json({
            success: true,
            table: newTable,
            message: "Table created successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createTable,
}
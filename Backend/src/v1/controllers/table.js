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
const updateTableById = async (req, res) => {
    try {
        const {id} = req.params;
        const {table_number, capacity ,status} =  req.body;
        const table = await Table.findById(id);
        if (!table) {
            return res.status(404).json({message: "Table not found"});
        }

        table.table_number = table_number != null ? table_number : table.table_number
        table.capacity = capacity != null ? capacity : table.capacity
        table.status = status != null ? status : table.status
       
        if (status !== "Occupied") {
            table.order = null;
        }
        
        await table.save();
       
        return res.status(200).json({
            success: true,
            table
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    createTable,
    updateTableById
}
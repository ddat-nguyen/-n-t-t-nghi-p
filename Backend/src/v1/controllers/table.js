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

const getTables = async (req, res) => {
    const {page = 1, limit = 10 } = req.query

    try {
        const tables = await Table.find().skip((page - 1) * limit).limit(limit).populate({
            path: "order",
            populate: [
                {
                    path: "items",
                    populate: {
                        path: "foodId",
                    }
                }, {
                    path: "user_id",
                    select: "username"
                }
            ]
        });

        return res.status(200).json({
            success: true,
            tables
        })
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getTableById = async (req, res) => {
    try {
        const {id} = req.params;
        const table = await Table.findById(id);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        
        return res.status(200).json({
            success: true,
            data: table
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
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
            message: "Table updated successfully",
            data: table
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTableById = async (req, res) => {
    try {
        const {id} = req.params;
        const table = await Table.findById(id);
        if (!table) {
            return res.status(404).json({message: "Table not found"})
        }

        await table.deleteOne({_id: id})
        
        return res.status(200).json({
            success: true,
            message: "Table deleted successfully", 
            data: table
        })
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createTable,
    updateTableById,
    deleteTableById,
    getTables,
    getTableById
}
const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
        const count = await Category.find().count();

        const {name, description, image} = req.body;

        const category = await Category.create({
            name: name,
            description: description,
            image: image, 
            position: count > 0 ? count : 0,
        })
        
        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating category',
        })
    }
}

module.exports = {createCategory}
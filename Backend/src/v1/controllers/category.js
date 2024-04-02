const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
        const count = await Category.find().count();

        const { name, description, image } = req.body;

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

const getCategories = async (req, res) => {
    const {page = 1, limit = 10} = req.query
    try {
        const categories = await Category.find().skip((page - 1) * limit).limit(limit).sort({position: 1});
        return res.status(200).json({
            success: true,
            data: categories,
        }) 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        await Category.findByIdAndUpdate(id,
            { $set: { ...req.body } }, { new: true })
        
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            }); 
        }
        const data = await Category.findByIdAndUpdate(id, {
            $set: {
                deleted: true
            }
        }, {new: true})
        return res.status(200).json({
            success: true, 
            data: category._id,
            message: "Category deleted"
        })

    } catch (error) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
module.exports = { createCategory, updateCategory, deleteCategory, getCategories }
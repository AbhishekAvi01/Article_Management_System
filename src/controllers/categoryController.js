const Category = require('../models/Category');

// @desc    Create a new category
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        
        const category = await Category.create({ name, slug, description });
        
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
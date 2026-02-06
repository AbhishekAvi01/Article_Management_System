const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2; // Image delete karne ke liye zaroori hai

// @desc    Create Category with Image
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
    try {
        const categoryData = req.body;

        // Agar Postman se file upload hui hai (req.file)
        if (req.file) {
            categoryData.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const category = await Category.create(categoryData);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get All Categories
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
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get Single Category
// @route   GET /api/categories/:id
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

// @desc    Update Category (with Image Cleanup)
// @route   PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

        const updateData = req.body;

        // Agar nayi image upload kar rahe hain
        if (req.file) {
            // 1. Purani image delete karein Cloudinary se (agar exist karti hai)
            if (category.image && category.image.public_id) {
                await cloudinary.uploader.destroy(category.image.public_id);
            }
            // 2. Nayi image details set karein
            updateData.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        category = await Category.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete Category (with Cloudinary Cleanup)
// @route   DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

        // Category delete karne se pehle uski image Cloudinary se remove karein
        if (category.image && category.image.public_id) {
            await cloudinary.uploader.destroy(category.image.public_id);
        }

        await category.deleteOne();
        res.status(200).json({ success: true, message: 'Category and Image removed' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};
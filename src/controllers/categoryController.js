const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2; 

exports.createCategory = async (req, res) => {
    try {
        const categoryData = req.body;

        
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

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

        const updateData = req.body;

        
        if (req.file) {
            
            if (category.image && category.image.public_id) {
                await cloudinary.uploader.destroy(category.image.public_id);
            }
            
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

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

        
        if (category.image && category.image.public_id) {
            await cloudinary.uploader.destroy(category.image.public_id);
        }

        await category.deleteOne();
        res.status(200).json({ success: true, message: 'Category and Image removed' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};
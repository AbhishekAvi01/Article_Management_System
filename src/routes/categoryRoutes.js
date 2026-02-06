const express = require('express');
const router = express.Router();
// upload middleware ko import karein
const upload = require('../config/cloudinary');

// Saare controller functions ko destructure karein
const { 
    createCategory, 
    getCategories, 
    updateCategory, 
    getCategory, 
    deleteCategory 
} = require('../controllers/categoryController');

// 1. Root routes ('/')
router.route('/')
    .get(getCategories)
    .post(upload.single('image'), createCategory); // Middleware yahan add karein

// 2. ID based routes ('/:id')
router.route('/:id')
    .get(getCategory)
    .put(upload.single('image'), updateCategory) // Update mein bhi image ho sakti hai
    .delete(deleteCategory);

module.exports = router;
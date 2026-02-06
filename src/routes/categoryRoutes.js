const express = require('express');
const router = express.Router();

const upload = require('../config/cloudinary');


const { 
    createCategory, 
    getCategories, 
    updateCategory, 
    getCategory, 
    deleteCategory 
} = require('../controllers/categoryController');


router.route('/')
    .get(getCategories)
    .post(upload.single('image'), createCategory); 


router.route('/:id')
    .get(getCategory)
    .put(upload.single('image'), updateCategory) 
    .delete(deleteCategory);

module.exports = router;
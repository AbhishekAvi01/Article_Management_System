const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary'); // Sabse pehle isse import karein

const { 
    createArticle, 
    getArticles, 
    getArticle,
    updateArticle,
    deleteArticle,
    getStats 
} = require('../controllers/articleController');

// 1. Stats route hamesha pehle rakhein
router.get('/stats', getStats);

// 2. Main routes '/' ke liye
router.route('/')
    .get(getArticles)
    .post(upload.single('image'), createArticle); // Yahan middleware add kiya

// 3. ID based routes '/:id' ke liye
router.route('/:id')
    .get(getArticle)
    .put(upload.single('image'), updateArticle) // Update mein bhi image ho sakti hai
    .delete(deleteArticle);

module.exports = router;
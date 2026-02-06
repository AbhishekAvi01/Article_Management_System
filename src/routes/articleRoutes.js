const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary'); 

const { 
    createArticle, 
    getArticles, 
    getArticle,
    updateArticle,
    deleteArticle,
    getStats 
} = require('../controllers/articleController');


router.get('/stats', getStats);


router.route('/')
    .get(getArticles)
    .post(upload.single('image'), createArticle); 


router.route('/:id')
    .get(getArticle)
    .put(upload.single('image'), updateArticle) 
    .delete(deleteArticle);

module.exports = router;
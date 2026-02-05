const express = require('express');
const router = express.Router();


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
    .post(createArticle);

router.route('/:id')
    .get(getArticle)
    .put(updateArticle)
    .delete(deleteArticle);

module.exports = router;
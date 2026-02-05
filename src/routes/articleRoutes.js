const express = require('express');
const router = express.Router();

// Sabhi controllers ko ek hi baar top par import karein
const { 
    createArticle, 
    getArticles, 
    getArticle,
    updateArticle,
    deleteArticle,
    getStats // Phase 6 ka naya controller
} = require('../controllers/articleController');

// ---------------------------------------------------------
// 1. Dashboard Statistics (Specific Route)
// URL: /api/articles/stats
// NOTE: Isse hamesha /:id se upar rakhein
// ---------------------------------------------------------
router.get('/stats', getStats);

// ---------------------------------------------------------
// 2. Base Routes (GET all aur POST new)
// URL: /api/articles
// ---------------------------------------------------------
router.route('/')
    .get(getArticles)
    .post(createArticle);

// ---------------------------------------------------------
// 3. ID Based Routes (GET single, PUT update, DELETE)
// URL: /api/articles/:id
// ---------------------------------------------------------
router.route('/:id')
    .get(getArticle)
    .put(updateArticle)
    .delete(deleteArticle);

module.exports = router;
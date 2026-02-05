const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');

router.route('/')
    .get(getCategories)
    .post(createCategory);

module.exports = router;
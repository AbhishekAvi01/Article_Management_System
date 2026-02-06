const Article = require('../models/Article');
const cloudinary = require('cloudinary').v2; // Image delete karne ke liye zaroori hai

// @desc    Create Article
// @route   POST /api/articles
exports.createArticle = async (req, res) => {
    try {
        const articleData = req.body;
        
        // Agar file upload hui hai toh image object add karein
        if (req.file) {
            articleData.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const article = await Article.create(articleData);
        res.status(201).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get All Articles (with Category Filter)
exports.getArticles = async (req, res) => {
    try {
        let query;
        if (req.query.category) {
            query = Article.find().populate({
                path: 'category',
                match: { slug: req.query.category }
            });
        } else {
            query = Article.find().populate('category', 'name slug');
        }

        const articles = await query;
        const filteredArticles = articles.filter(art => art.category !== null);

        res.status(200).json({
            success: true,
            count: filteredArticles.length,
            data: filteredArticles
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get Single Article
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('category');
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

// @desc    Update Article (with Image Cleanup)
exports.updateArticle = async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });

        const updateData = req.body;

        // Agar nayi image upload kar rahe hain
        if (req.file) {
            // 1. Purani image delete karein (agar exist karti hai)
            if (article.image && article.image.public_id) {
                await cloudinary.uploader.destroy(article.image.public_id);
            }
            // 2. Nayi image details set karein
            updateData.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        article = await Article.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete Article (with Cloudinary Image Delete)
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });

        // Image delete karein Cloudinary se
        if (article.image && article.image.public_id) {
            await cloudinary.uploader.destroy(article.image.public_id);
        }

        await article.deleteOne();
        res.status(200).json({ success: true, message: 'Article and Image removed' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

// @desc    Get Dashboard Stats
exports.getStats = async (req, res) => {
    try {
        const stats = await Article.aggregate([
            {
                $facet: {
                    overview: [
                        {
                            $group: {
                                _id: null,
                                totalArticles: { $sum: 1 },
                                publishedCount: { $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] } },
                                draftCount: { $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] } }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    byCategory: [
                        { $group: { _id: "$category", count: { $sum: 1 } } },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "_id",
                                foreignField: "_id",
                                as: "categoryDetails"
                            }
                        },
                        { $unwind: "$categoryDetails" },
                        { $project: { _id: 0, categoryName: "$categoryDetails.name", count: 1 } }
                    ]
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overview: stats[0].overview[0] || { totalArticles: 0, publishedCount: 0, draftCount: 0 },
                byCategory: stats[0].byCategory
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
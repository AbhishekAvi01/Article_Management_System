const Article = require('../models/Article');

// @desc    Create Article
// @route   POST /api/articles
exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get All Articles (with Filtering & Category Details)
// @route   GET /api/articles?category=slug
exports.getArticles = async (req, res) => {
    try {
        let query;

        // Agar query mein category slug hai, toh filter karo
        if (req.query.category) {
            query = Article.find().populate({
                path: 'category',
                match: { slug: req.query.category }
            });
        } else {
            query = Article.find().populate('category', 'name slug');
        }

        const articles = await query;

        // Agar category filter kiya hai aur category nahi mili toh empty array dikhega
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
// @route   GET /api/articles/:id
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('category');
        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }
        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};

// @desc    Update Article
// @route   PUT /api/articles/:id
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Updated object return karega
            runValidators: true // Schema rules check karega
        });

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete Article
// @route   DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({ success: true, data: {}, message: 'Article removed' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid ID' });
    }
};


// @desc    Get Dashboard Stats
// @route   GET /api/stats
exports.getStats = async (req, res) => {
    try {
        const stats = await Article.aggregate([
            {
                $facet: {
                    // 1. Total, Published, and Draft counts
                    overview: [
                        {
                            $group: {
                                _id: null,
                                totalArticles: { $sum: 1 },
                                publishedCount: {
                                    $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] }
                                },
                                draftCount: {
                                    $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] }
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    // 2. Articles per Category
                    byCategory: [
                        {
                            $group: {
                                _id: "$category",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $lookup: {
                                from: "categories", // Category collection se join
                                localField: "_id",
                                foreignField: "_id",
                                as: "categoryDetails"
                            }
                        },
                        { $unwind: "$categoryDetails" },
                        {
                            $project: {
                                _id: 0,
                                categoryName: "$categoryDetails.name",
                                count: 1
                            }
                        }
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
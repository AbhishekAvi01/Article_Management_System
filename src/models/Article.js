const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [150, 'Title is too long']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    // Reference to Category Model (The Relationship)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Article must belong to a category']
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
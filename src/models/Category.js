const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true // Fast searching ke liye indexing
    },
    description: {
        type: String,
        maxlength: [200, 'Description cannot be more than 200 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Category is required'],
        minlength: [5, 'Category should be at least 5 characters long']
    },
})

module.exports = mongoose.model('Category', categorySchema); 
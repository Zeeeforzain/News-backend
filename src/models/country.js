const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({

    countryId: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true,
        trim: true
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country is required'],
        minlength: [5, 'Country should be at least 5 characters long']
    },
})

module.exports = mongoose.model('Country', countrySchema); 
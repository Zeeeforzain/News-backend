
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
import { Schema, model, ObjectId } from 'mongoose';
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving to the database
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Compare input password with stored hashed password
adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);

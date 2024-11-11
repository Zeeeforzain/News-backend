const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the admin schema
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [12, 'Password should be at least 12 characters long']
    },
    role: {
        type: String,
        default: 'admin',  // Default role for admins
        enum: ['admin', 'superadmin'] // You can expand roles if needed
    }
}, { timestamps: true });

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

// Export the admin model
module.exports = mongoose.model('Admin', adminSchema); 

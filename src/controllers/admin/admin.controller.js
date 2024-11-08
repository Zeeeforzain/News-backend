
const Admin = require('../../models/admin/admin.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Admin Registration
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ error: 'Admin already exists with this email' });
        }

        const admin = new Admin({ email, password });
        await admin.save();

        res.status(201).send({ message: 'Admin registered successfully!' });
    } catch (e) {
        res.status(500).send({ error: 'Failed to register admin' });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ error: 'Admin not found' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });

        res.send({ message: 'Login successful', token });
    } catch (e) {
        res.status(500).send({ error: 'Failed to log in' });
    }
};

// Middleware to verify Admin authorization
exports.authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Invalid or expired token' });
    }
};

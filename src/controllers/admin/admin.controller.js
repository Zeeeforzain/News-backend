const Admin = require('../../models/admin/admin.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';// Assuming you have a utility for consistent responses
const validator = require('../../validators/schemas'); // Assuming you have a validator object

// Admin Registration
exports.registerAdmin = async (req, res) => {
    try {
        // Validate the request data
        const { error } = validator['/admin/signup'].validate(req.body);
        if (error) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: error.details[0].message,
                data: {},
            });
        }

        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Admin already exists with this email',
                data: {},
            });
        }

        const admin = new Admin({ email, password });
        await admin.save();

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Admin registered successfully!',
            data: { email },
        });
    } catch (e) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to register admin',
            data: {},
        });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        // Validate the request data
        const { error } = validator['/admin/signup'].validate(req.body);
        if (error) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: error.details[0].message,
                data: {},
            });
        }

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Admin not found',
                data: {},
            });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Invalid password',
                data: {},
            });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Login successful',
            data: { token },
        });
    } catch (e) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Failed to log in',
            data: {},
        });
    }
};

// Middleware to verify Admin authorization
exports.authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Authorization token required',
            data: {},
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (e) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Invalid or expired token',
            data: {},
        });
    }
};

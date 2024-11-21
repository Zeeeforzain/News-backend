const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('../../controllers/admin/admin.controller');
const newsController = require('../../controllers/admin/news.controller');

// Import middleware
const auth= require("../../middlewares/admin/auth.middleware") // Ensure the path and file name are correct
const { isCategoryValid } = require('../../middlewares/admin/category.middleware');
const schemaValidator = require('../../validators/schemaValidator'); // Ensure schemaValidator works with provided paths

// Admin registration route
router.post(
    '/admin/register',
    schemaValidator('/admin/signup'), // Checks the request body against the signup schema
    adminController.registerAdmin
);

// Admin login route
router.post(
    '/admin/login',
    schemaValidator('/admin/login'), // Checks the request body against the login schema
    adminController.loginAdmin
);

// Protected Routes for Admin (only accessible by authenticated admins)
// Create news
router.post(
    '/news',
    auth, // Requires authentication
    schemaValidator('/news/create'), // Checks the request body against the news creation schema
    newsController.createNews
);

// Update news by ID
router.put(
    '/news/:id',
    auth, // Requires authentication
    schemaValidator('/news/update'), // Checks the request body against the news update schema
    newsController.updateNews
);

// Delete news by ID
router.delete(
    '/news/:id',
    auth, // Requires authentication
    newsController.deleteNews
);

// Update news category (with additional category validation)
router.put(
    '/news/category/:newsId',
    auth, // Requires authentication
    isCategoryValid, // Validates that the category is valid before proceeding
    newsController.updateCategory
);

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/admin.controller');
const newsController = require('../../controllers/admin/news.controller');
const { authenticateAdmin } = require('../../controllers/admin/admin.controller');
const { isCategoryValid } = require('../../middlewares/admin/category'); // Correct path for middleware
const { validate } = require('../../middlewares/validator'); // Correct path for validator

// Admin registration route
router.post('/admin/register', validate('/admin/signup'), adminController.registerAdmin);

// Admin login route
router.post('/admin/login', validate('/admin/signup'), adminController.loginAdmin);

// Protected Routes for Admin (only accessible by admins)
router.post('/news', authenticateAdmin, validate('/news/create'), newsController.createNews);
router.put('/news/:id', authenticateAdmin, validate('/news/create'), newsController.updateNews);
router.delete('/news/:id', authenticateAdmin, newsController.deleteNews);

// Route with category validation
router.put('/news/category/:newsId', authenticateAdmin, isCategoryValid, newsController.updateCategory);

module.exports = router;

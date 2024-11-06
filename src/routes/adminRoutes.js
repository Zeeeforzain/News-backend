
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const newsController = require('../controllers/newsControllers');
const { authenticateAdmin } = require('../controllers/adminController');

// Admin registration route
router.post('/admin/register', adminController.registerAdmin);

// Admin login route
router.post('/admin/login', adminController.loginAdmin);

// Protected Routes for Admin (only accessible by admins)
router.post('/news', authenticateAdmin, newsController.createNews);
router.put('/news/:id', authenticateAdmin, newsController.updateNews);
router.delete('/news/:id', authenticateAdmin, newsController.deleteNews);

module.exports = router;

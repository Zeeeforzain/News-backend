const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/admin/news.controller');  // Corrected import
const { auth } = require('../../controllers/admin/admin.controller'); // Middleware for authentication

// User Routes (Accessible by everyone)
router.get('/news', newsController.getAllNews);  // Get all news
router.get('/news/:id', newsController.getNewsById);  // Get a specific news item by ID

// Admin Routes (Protected, accessible only by authenticated admins)
router.post('/news', auth, newsController.createNews);  // Create a new news item
router.put('/news/:id', auth, newsController.updateNews);  // Update an existing news item
router.delete('/news/:id', auth, newsController.deleteNews);  // Delete a news item

module.exports = router;

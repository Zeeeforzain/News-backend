
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsControllers');

// User Routes (Accessible by everyone)
router.get('/news', newsController.getAllNews);
router.get('/news/:id', newsController.getNewsById);

module.exports = router;

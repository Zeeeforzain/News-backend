const News = require("../../models/news.model");

exports.createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        const createNews = await news.save();
        res.status(201).send({
            success: true,
            message: 'News created successfully',
            data: createNews
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: 'Error creating news',
            error: e.message
        });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const newsData = await News.find();
        res.send({
            success: true,
            data: newsData
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Error retrieving news',
            error: e.message
        });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const _id = req.params.id;
        const newsData = await News.findById(_id);
        if (!newsData) {
            return res.status(404).send({
                success: false,
                message: 'News not found'
            });
        }
        res.send({
            success: true,
            data: newsData
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Error retrieving news',
            error: e.message
        });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const _id = req.params.id;
        
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No data provided for update'
            });
        }

        const newsUpdate = await News.findByIdAndUpdate(_id, req.body, { new: true });
        if (!newsUpdate) {
            return res.status(404).send({
                success: false,
                message: 'News not found'
            });
        }
        res.send({
            success: true,
            message: 'News updated successfully',
            data: newsUpdate
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Error updating news',
            error: e.message
        });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteNews = await News.findByIdAndDelete(_id);
        if (!deleteNews) {
            return res.status(404).send({
                success: false,
                message: 'News not found'
            });
        }
        res.send({
            success: true,
            message: 'News deleted successfully',
            data: deleteNews
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Error deleting news',
            error: e.message
        });
    }
};

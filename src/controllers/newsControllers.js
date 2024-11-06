
const News = require("../models/news");

exports.createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        const createNews = await news.save();
        res.status(201).send(createNews);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const newsData = await News.find();
        res.send(newsData);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const _id = req.params.id;
        const newsData = await News.findById(_id);
        if (!newsData) {
            return res.status(404).send();
        } else {
            res.send(newsData);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateNews = async (req, res) => {
    try {
        const _id = req.params.id;
        const newsUpdate = await News.findByIdAndUpdate(_id, req.body, { new: true });
        if (!newsUpdate) {
            return res.status(404).send();
        }
        res.send(newsUpdate);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteNews = await News.findByIdAndDelete(_id);
        if (!deleteNews) {
            return res.status(404).send();
        }
        res.send(deleteNews);
    } catch (e) {
        res.status(500).send(e);
    }
};

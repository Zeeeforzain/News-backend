const express = require('express');
const PORT = process.env.PORT || 3000;
const connectDB=require("./src/database/connection")
const News = require("./src/models/news")

const app = express();
app.use(express.json());

app.post("/news", async (req, res) => {
    try {
        const news = new News(req.body);
        const createNews = await news.save();
        res.status(201).send(createNews);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get("/news", async (req, res) => {
    try {
        const newsData = await News.find();
        res.send(newsData);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/news/:id", async (req, res) => {
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
});

app.put("/news/:id", async (req, res) => {
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
});

app.delete("/news/:id", async (req, res) => {
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
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Connection is setup at ${PORT}`);
});


const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const connectDB=require("./src/database/connection")

app.get('/', async (req, res) => {
    try {
        res.send('Hello World');
    } catch (e) {
        res.status(500).send(e);
    }
});

const start = async () => {
    try {
        app.listen(PORT, () => {
            connectDB();
            console.log(`Application is live at Port ${PORT}`);
        });
    } catch (e) {
        console.error('Server startup failed:', e);
    }
};
start();

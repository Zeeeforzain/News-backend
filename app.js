
const express = require('express');
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/database/connection');
const newsRoutes = require('./src/routes/admin/news.routes');
const adminRoutes = require('./src/routes/admin/admin.routes');

const app = express();
app.use(express.json());


app.use(newsRoutes);
app.use(adminRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Connection is set up at ${PORT}`);
});

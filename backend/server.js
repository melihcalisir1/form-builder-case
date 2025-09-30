require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');

const authRoutes = require('./src/routes/auth'); // ✨

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // ✨

app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`API running on http://localhost:${PORT}`);
    });
});
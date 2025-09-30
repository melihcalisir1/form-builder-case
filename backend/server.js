require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');

const authRoutes = require('./src/routes/auth');   // ✨
const formRoutes = require('./src/routes/forms'); // ✨ yeni ekledik

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);   // auth işlemleri
app.use('/api/forms', formRoutes); // form CRUD işlemleri ✨

app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`API running on http://localhost:${PORT}`);
    });
});
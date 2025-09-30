const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');
const Form = require('../models/Form');
const FormResponse = require('../models/FormResponse');

// Özet istatistikler
router.get('/stats', auth, isAdmin, async (req, res) => {
    try {
        const [usersCount, formsCount, responsesCount] = await Promise.all([
            User.countDocuments(),
            Form.countDocuments(),
            FormResponse.countDocuments(),
        ]);
        res.json({ usersCount, formsCount, responsesCount });
    } catch (err) {
        res.status(500).json({ message: 'İstatistikler alınamadı' });
    }
});

// Kullanıcıları getir
router.get('/users', auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Kullanıcılar getirilemedi' });
    }
});

// Belirli kullanıcının formları
router.get('/users/:userId/forms', auth, isAdmin, async (req, res) => {
    try {
        const forms = await Form.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ message: 'Formlar getirilemedi' });
    }
});

// Belirli formun cevapları
router.get('/forms/:formId/responses', auth, isAdmin, async (req, res) => {
    try {
        const responses = await FormResponse.find({ formId: req.params.formId })
            .populate('userId', 'email')
            .sort({ createdAt: -1 });
        res.json(responses);
    } catch (err) {
        res.status(500).json({ message: 'Cevaplar getirilemedi' });
    }
});

module.exports = router;



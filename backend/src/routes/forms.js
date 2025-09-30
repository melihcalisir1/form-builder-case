const express = require('express');
const Form = require('../models/Form');
const auth = require('../middleware/auth');

const router = express.Router();

// Yeni form oluştur
router.post('/', auth, async (req, res) => {
    try {
        const form = new Form({
            userId: req.user.userId,
            title: req.body.title,
            schema: req.body.schema
        });
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Kullanıcının formlarını getir
router.get('/', auth, async (req, res) => {
    const forms = await Form.find({ userId: req.user.userId });
    res.json(forms);
});

// Form güncelle
router.put('/:id', auth, async (req, res) => {
    try {
        const form = await Form.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title: req.body.title, schema: req.body.schema },
            { new: true }
        );
        if (!form) return res.status(404).json({ message: 'Form bulunamadı' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Form sil
router.delete('/:id', auth, async (req, res) => {
    try {
        const form = await Form.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!form) return res.status(404).json({ message: 'Form bulunamadı' });
        res.json({ message: 'Form silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const auth = require("../middleware/auth"); // ✅ import
const FormResponse = require("../models/FormResponse");

// Create
router.post("/", auth, async (req, res) => {
    try {
        const { title, schema } = req.body;
        const form = new Form({
            userId: req.user.id,   // ✅ artık token’den geliyor
            title,
            schema,
        });
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        console.error("Create form error:", err);
        res.status(500).json({ message: err.message || "Form kaydedilemedi" });
    }
});

// List
router.get("/", auth, async (req, res) => {
    try {
        const forms = await Form.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(forms);
    } catch (err) {
        console.error("List forms error:", err);
        res.status(500).json({ message: "Formlar getirilemedi" });
    }
});

// Tek formu getir
router.get("/:id", auth, async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form bulunamadı" });
        res.json(form);
    } catch (err) {
        console.error("Get form error:", err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

// ✅ Form doldurma (response kaydetme)
router.post("/:id/responses", auth, async (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers) {
            return res.status(400).json({ message: "Cevaplar gerekli" });
        }

        const response = new FormResponse({
            formId: req.params.id,
            userId: req.user.id,
            answers,
        });

        await response.save();
        res.status(201).json(response);
    } catch (err) {
        console.error("Response save error:", err);
        res.status(500).json({ message: "Cevap kaydedilemedi" });
    }
});

// ✅ Belirli formun tüm cevaplarını getir
router.get("/:id/responses", auth, async (req, res) => {
    try {
        const responses = await FormResponse.find({ formId: req.params.id })
            .populate("userId", "email")
            .sort({ createdAt: -1 });

        res.json(responses);
    } catch (err) {
        console.error("Get responses error:", err);
        res.status(500).json({ message: "Cevaplar alınamadı" });
    }
});

module.exports = router;
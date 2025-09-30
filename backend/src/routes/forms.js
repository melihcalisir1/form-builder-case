const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const { authMiddleware } = require("../middleware/auth");

// Create
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, schema } = req.body;
        const form = new Form({
            userId: req.user.id,   // ← artık garanti var
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
router.get("/", authMiddleware, async (req, res) => {
    try {
        const forms = await Form.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(forms);
    } catch (err) {
        console.error("List forms error:", err);
        res.status(500).json({ message: "Formlar getirilemedi" });
    }
});

module.exports = router;
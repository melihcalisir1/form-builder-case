const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
    {
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Form",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        answers: {
            type: Object, // { "field_id": "cevap" } gibi
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FormResponse", responseSchema);
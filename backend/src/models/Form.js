const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    schema: {
        type: Array, // react-form-builder2 JSON çıktısı
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
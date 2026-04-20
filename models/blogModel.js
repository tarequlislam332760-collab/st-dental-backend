const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: 'https://via.placeholder.com/600' },
    category: { type: String, default: 'Dental Care' },
    author: { type: String, default: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
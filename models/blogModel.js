const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // ইমেজের ইউআরএল থাকবে এখানে
    category: { type: String, default: 'Dental Care' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
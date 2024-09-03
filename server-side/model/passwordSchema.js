const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
}, {timestamps: true});

module.exports = mongoose.model('Password', passwordSchema);
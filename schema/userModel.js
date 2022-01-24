const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
},
    {
        timestamps: true
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
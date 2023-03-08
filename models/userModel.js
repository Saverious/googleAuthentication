const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    _id:{
        type:Number
    },

    name:{
        type:String
    },

    email:{
        type:String,
        validate:[validator.isEmail, 'Invalid email address']
    },

    avatar:{
        type:String
    }
});

module.exports = mongoose.model('User',userSchema);
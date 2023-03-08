require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.CONSTRING;

const connectDb = async(req,res) =>{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
}

module.exports = connectDb;
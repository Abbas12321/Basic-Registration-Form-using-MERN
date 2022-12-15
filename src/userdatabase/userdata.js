const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const users_schema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

users_schema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    this.confirmpassword = await bcrypt.hash(this.confirmpassword,12)
})

const userCollection1 = new mongoose.model('UserCollection1',users_schema);
module.exports = userCollection1;
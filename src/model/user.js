const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        default:null
    },
    date:{
        type: Date,
        required :true
    },
    email:{
        type: String,
        unique:true
    },
    password:{
        type: String,
        unique:true
    },
    token:{
        type: String,
    },
    taluka:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    country:{
        type: String,
    }
})

module.exports = mongoose.model('user',userSchema)
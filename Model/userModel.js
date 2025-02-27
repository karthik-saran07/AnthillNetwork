const mongoose = require('mongoose')
const {v4 : uuidv4} = require('uuid')

const userSchema = new mongoose.Schema( {
    userId : {
        type : String,
        unique : true,
        default : () => uuidv4()
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin']
    }
}, {timestamps : true} );

const userModel = new mongoose.model('userModel', userSchema)

module.exports = userModel
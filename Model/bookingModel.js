const mongoose = require('mongoose')
const {v4 : uuidv4} = require('uuid')

const bookingSchema = new mongoose.Schema({
    bookingId : {
        type : String,
        unique : true,
        default : () => uuidv4()
    },
    userId : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    busId : {
        type : String,
        unique : true,
        required : true
    },
    busName : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Booked', 'Cancelled']
    }, 
},
{ timestamps : true} )

const bookingModel = new mongoose.model('bookingModel', bookingSchema);

module.exports = bookingModel;
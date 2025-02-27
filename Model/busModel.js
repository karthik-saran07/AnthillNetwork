const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid')

const busSchema = new mongoose.Schema ( {
    busId : {
        type : String,
        unique : true,
        default : () => uuidv4()
    },
    busName : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    ticketPrice : {
        type : Number,
        required : true
    }
}, { timestamps : true } );

const busModel = new mongoose.model ( 'busModel', busSchema );

module.exports = busModel;
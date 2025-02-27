const busModel = require('../Model/busModel.js')
const userModel = require('../Model/userModel.js')
const bookingModel = require('../Model/bookingModel.js')
const { v4: uuidv4 } = require('uuid'); 

const getAllBus = async ( req, res ) => {

    const busDetails = await busModel.find();

    if ( !busDetails || busDetails.length === 0 )
        return res.json({message : "No buses available.."});
    return res.status(201).json({ busDetails });

}

const bookTicket = async ( req, res ) => {

    try {
        const { userId, busId } = req.body;

        const userExist = await userModel.findOne({userId});
        if ( !userExist )
            return res.json({message : "User does not exist"});
        
        const busExist = await busModel.findOne({busId});
        if ( !busExist )
            return res.json({message : "Bus does not exist"});

        const bookBus = new bookingModel({
            userId,
            name : userExist.name,
            busId,
            busName : busExist.busName,
            status : 'Booked'
        })
        await bookBus.save();

        return res.status(201).json({message:"Ticket has been booked"});
    }
    catch ( error ) {
        return res.json({message : "Error in booking ticket"});
    }
}

const cancelTicket = async ( req, res ) => {

    try {
        const { bookingId } = req.body;
        // console.log(bookingId);
        
        const ticketExist = await bookingModel.findOne({bookingId});
        // console.log(ticketExist);
        
        if ( !ticketExist )
            return res.json({message : "Ticket does not exist"});

        ticketExist.status = "Cancelled";
        await ticketExist.save();

        return res.status(201).json({message : "Ticket cancelled sucessfully.."})
    }
    catch ( error ) {
        return res.json({message : "Error occured in ticket cancellation.."});
    }
}

const showBookings = async ( req, res ) => {
    try {

        const { userId } = req.body;

        const userExist = await userModel.findOne( { userId : userId } );
        if ( !userExist )
            return res.json({message : "User does not exist"})

        const userBookings = await bookingModel.find({ userId : userId })

        if ( !userBookings || userBookings.length === 0 )
            return res.json({message : "No bookings for this user"})
        return res.json({userBookings})

    } catch (error) {
        return res.json({message : "Error occured in show bookings"})
    }
}


module.exports = { getAllBus, bookTicket, cancelTicket, showBookings }
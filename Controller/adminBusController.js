const busModel = require('../Model/busModel.js');
const { v4: uuidv4 } = require('uuid'); 

const addBus = async ( req, res ) => {
    try {
        const { busName, from, to, ticketPrice } = req.body;

    if ( !busName || !from || !to || !ticketPrice )
        return res.json({message : "Fill all details"})

    const existingBus = await busModel.findOne({busName});
    if ( existingBus )
        return res.json({message:"Bus already exisits!!"});

    const newBus = new busModel( {
        busId : uuidv4(), busName, from, to, ticketPrice
    }) 
    await newBus.save();

    return res.status(201).json({message : "Bus added sucessfully!"});

    }
    catch ( error ) {
        return res.json({message : "Error occured in adding new bus"});
    }
}

const updateBus = async ( req, res ) => {
    try {
        const { id : busId } = req.params;
        const { busName, from, to, ticketPrice } = req.body;

        console.log(busId);
        

        if ( !busName || !from || !to || !ticketPrice )
            return res.json({message:"Fill all details"})

        
        const checkBus = await busModel.findOne({busId : busId});
        if ( !checkBus )
            return res.json({message:"Bus does not exisit, check the id.."});

        const busRouteExisit = await busModel.findOne({
            from,
            to,
            busId : {$ne : busId} // current bus is not included
        })

        if ( busRouteExisit )
            return res.json({message: "Another bus is already assigned to this route!!"});

        checkBus.busName = busName;
        checkBus.from = from;
        checkBus.to = to;
        checkBus.ticketPrice = ticketPrice;

        await checkBus.save();
        return res.status(201).json({ message : "Bus has been updated successfully"})
        }
        catch (error) {
            console.log(error);
            
            return res.json({message:"Error occured in updating bus"});
        }
}

const deleteBus = async ( req, res ) => {
    try {
        const { id : busId } = req.params;

    const busExist = await busModel.findOne({busId : busId});
    if ( !busExist )
        return res.json({message : "Bus does not exist"});

    const deleteBus = await busModel.findOneAndDelete({busId})
    
    return res.status(200).json({message:"Bus has been deleted sucessfully"})
    }
    catch ( error ) {
        return res.json({message:"Error occured in deleting bus"});
    }
}

module.exports = { addBus, updateBus, deleteBus };
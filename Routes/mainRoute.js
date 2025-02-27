const express = require('express')
const route = express.Router()

const { userLogin, userSignup } = require('../Controller/userController.js')
const { addBus, updateBus, deleteBus } = require('../Controller/adminBusController.js')
const { getAllBus, bookTicket, cancelTicket, showBookings } = require('../Controller/userBusController.js')
const { verifyToken, verifyAdmin } = require('../Middleware/middleWare.js')

//credentials
route.post('/userLogin', userLogin);
route.post('/userSignup', userSignup);

//bus management
route.post('/addBus', verifyAdmin, addBus);
route.put('/updateBus/:id', verifyAdmin, updateBus);
route.delete('/deleteBus/:id', verifyAdmin, deleteBus);

//user access management
route.get('/getAllBus', verifyToken, getAllBus);
route.get('/showBookings', verifyToken, showBookings)
route.post('/bookTicket', verifyToken, bookTicket);
route.put('/cancelTicket', verifyToken, cancelTicket);


module.exports = route
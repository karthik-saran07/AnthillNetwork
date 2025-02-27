const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

const mainRoute = require('./Routes/mainRoute.js')

app.listen ( 3000, () => {
    console.log(`Server running in port 3000`);
    
} )

const mongo_url = process.env.mongo_url;


mongoose.connect(mongo_url).then ( ()=> {
    console.log("Connected to db");
} ).catch ( (error)=> {
    console.log(error);
} )

app.use('/api', mainRoute)

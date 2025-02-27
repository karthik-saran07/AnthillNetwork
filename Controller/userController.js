const userModel = require('../Model/userModel.js')
const {v4 : uuidv4} = require('uuid')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSignup = async (req, res) => {
    try {
        // console.log(req.body);
        
        const { name, email, password, role } = req.body;
        if ( !name || !email || !password || !role )
            return res.json({message : "Fill all data..."})

        if ( role !== "user" )
            return res.json({ message : "Only user is allowed !!" });

        const exisitingUser = await userModel.findOne({email});
        if ( exisitingUser )
            return res.json({ message : "user already exists" });

        let newUser = new userModel( {
            userId : uuidv4(), name, email, password, role
        })
        await newUser.save();

        return res.status(201).json({ message : "User Signup is sucessful !!" })

    } catch (error) {
        console.error(error);
        return res.json({message : "Error occured in user signup !!"});
    }
}

const userLogin = async ( req, res ) => { 

    try {

        const { email, password, role } = req.body;

        // console.log(req.body);

        if ( !email || !password || !role ) 
            return res.json({message : "All fields are required !"});

        const checkUser = await userModel.findOne({email})
        if ( !checkUser )
            return res.json({message : "User does not exist in database, signup !!"});

        if ( checkUser.password !== password )
                return res.json({message : "Password does not match !!"});
        
        if ( checkUser.role != role )
                return res.json({message : "Invalid role for given email"});

        const token = jwt.sign(
            { userId: checkUser.userId, role: checkUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        return res.status(201).json({message: `${role} login sucessful`, token})
    } catch (error) {
        console.error("Error occured in user login");
        return res.json({message : "Error occured in user login !!"});
    }
    
}

module.exports = { userSignup, userLogin }

require("dotenv").config();
require('./config/database').connect();
const express =require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser());

const User = require('./model/user');



app.post("/register", async (req,res) => {
    try {
        const { fullname, taluka, date, email, password,city,state,country} = req.body;
    
    if (!(email && password && fullname && taluka && city && state && country && date)) {
   res.status(400).send('all fields are required')
    }
   const existingUser = await User.findOne({ email }); //promise
   
   if (existingUser) {
       res.status(401).send("user does exist")
   }
    
   myEncPassword = await bcrypt.hash(password, 10)
   
   const user = await User.create({
    fullname,
    state,
    taluka,
    city,
    country,
    email : email.toLowerCase(),
    password: myEncPassword 
   }) 
    
   //token
   const token = jwt.sign(
    {user_id:user._id, email},
    process.env.SECRET_KEY,
    {
        expiresIn:"2h"
    }
   )
    user.token = token//update or not in DB

    //handle password situation
    // user.password = undefined
    res.status(201).json(user)
    }
    catch (error){
      console.log(error);
    }

} )

app.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body
        
        if (!(email && password)) {
            res.status(400).send("Field is missing")
        }
     
      const user = await User.findOne({email})
      
      if(!user){
        res.status(400).send("you are not registered")
      }

    if (user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            {user_id: user._id,email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        )
        user.token = token 
        user.password = undefined
        // res.status(200).json(user)

       const options = {
        expires: new Date ( Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
       };
       res.status(200).cookie('token',token,options).json({
        success:true,
        token,
        user,        
       })

    }
    
    res.status(400).send("email or password is incorrect")

    } catch (error) {
        console.log(error);
    }
})






module.exports= app ;
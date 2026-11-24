const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlackList = require ('../models/blackListModel')

 const registerUser = async (req,res)=>{

    try{

        const {username,email,password} =  req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message:'All fields are required'
            })
        }
         if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }
        // check user with email and name exist
        const isUserExist = await userModel.findOne({
            $or : [ {username} , {email} ]
        })
        if(isUserExist){
             return res.status(409).json({
                success: false,
                message:'Account already exist with this email address or username'
            })
        }
// hashing password
        const hashPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            {
                id : user._id , 
                username: user.username
            },
            process.env.JWT_SECRET,
            { 
                expiresIn : "1d"
            }
        )

        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message:'User register Successfully',
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    }catch(error){
         console.error('Register Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

 const loginUser = async (req,res) =>{
    try{
        const { email , password } = req.body
     if( !email || !password){
            return res.status(400).json({
                success: false,
                message:'All fields are required'
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'Invalid email or password'
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({
                message:'Invalid email or password'
            })
        }

         const token = jwt.sign(
            {
                id : user._id , 
                username: user.username
            },
            process.env.JWT_SECRET,
            { 
                expiresIn : "1d"
            }
        )

        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message:'User loggedIn Successfully',
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    }
    catch(error){
         console.error('Login Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const getMe = async (req,res) =>{
    try{
        const user = await userModel.findById(req.user.id)

        res.status(200).json({
            message:"User Fetch successfully",
            user:{
                id:user._id,
                username:user.username,
                email: user.email
            }
        })
    }
    catch(err){
          console.error('Get Profile Error:', err);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    
    }
}

 const logoutUser = async (req,res) =>{
    
    const token = req.cookies.token
    if(token){
        await tokenBlackList.create({token})
    }
    res.clearCookie('token')
    res.status(200).json({
        message:'User Logged Out successfully'
    })
 }
module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}
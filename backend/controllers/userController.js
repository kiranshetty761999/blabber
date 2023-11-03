const User = require('../models/userModel')
const generateAccessToken = require('../config/generateToken')

const login = async (req, res) => {

        if (!req.body.email || !req.body.password) {
            res.status(400)
            throw new Error('Enter both email Id and password')
        } else {

            const registeredUser = await User.findOne({ email: req.body.email })
     
            if (registeredUser && (await registeredUser.verifyPassword(req.body.password))) {
                res.json({
                    name: registeredUser.name,
                    email: registeredUser.email,
                    userId: registeredUser._id,
                    profilePic: registeredUser?.profilePic,
                    token: generateAccessToken(registeredUser._id)
                })
            } else {
                throw new Error("Email id or password does not exist")
            }

        }

}


const register = async (req, res) => {
   
        if (!req.body.name || !req.body.email || !req.body.password)
            throw new Error("Please send all the details")

        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }
        else {
            const userCreated = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.body?.profilePic
            })

            if (userCreated) {
                res.status(201).json({
                    name: userCreated.name,
                    email: userCreated.email,
                    userId: userCreated._id,
                    profilePic: userCreated?.profilePic,
                    token: generateAccessToken(userCreated._id)
                })
            }
            else {
                res.status(400)
                throw new Error('Failed to register the user')
            }
        }

}


module.exports = { login, register }
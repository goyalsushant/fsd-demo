import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../helpers/tokenHelper.js'

export const register = async (req, res) => {
    const { firstName, lastName, email, password, mobile } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        res.json({ message: 'User already exisits' })
        return
    }

    const user = User.create({
        firstName,
        lastName,
        email,
        password,
        mobile
    })



    res.status(201)
    res.json({
        token: generateToken(user._id, email, user.role),
        user: {
            email,
            firstName,
            role: user.role
        }
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const isMatch = bcrypt.compare(password, user.password)
    if (user && isMatch) {
        res.json({
            id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, email, user.role)
        })
    }
    else {
        res.status(401)
        res.json({ message: 'Invalid Credentials' })
    }
}

export const getUserProfile = (req, res) => {
    res.json(req.user)
}
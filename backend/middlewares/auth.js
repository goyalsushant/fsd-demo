import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const auth = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    if (token) {
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET)
            req.user = User.findById(verify.id)
            next()
        }
        catch (err) {
            res.status(401)
            res.json({ message: 'Token is required' })
        }
    }
    else {
        res.status(401)
        res.json({message: 'Token is required'})
    }
}
import jwt from 'jsonwebtoken'
export const generateToken = (id, email) => {
    const token = jwt.sign({
        id: id,
        email
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return token
}
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String},
        email: {type: String, required: true, unique: true},
        mobile: {type: Number, required: true},
        password: {type: String, required: true},
        address: {type: String},
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        paymentDetails: {
            cardNumber: Number,
            expiry: String,
            cvv: String
        }
    },
    {timestamps: true}
)

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('User', userSchema)
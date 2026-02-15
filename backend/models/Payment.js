import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        platformUsed: String,
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['success', 'failed', 'pending'],
            default: 'pending'
        },
        amount: Number
    },
    {timestamps: true}
)

export default mongoose.model('Payment', paymentSchema)
import mongoose from 'mongoose'

const supportSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        payment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
        }
    },
    {timestamps: true}
)

export default mongoose.model('Support', supportSchema)
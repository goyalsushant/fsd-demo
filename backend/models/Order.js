import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: Number
            }
        ],
        amount: Number,
        status: {
            type: String,
            enum: ['pending', 'processed', 'shipped', 'delivered', 'error', 'cancelled'],
            default: 'pending'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
)

export default mongoose.model('Order', orderSchema)
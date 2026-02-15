import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product_info: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: Number
            }
        ],
    }
)

export default mongoose.model('Cart', cartModel)
import mongoose, { mongo } from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        title: String,
        description: String,
        images: [String],
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
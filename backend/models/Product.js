import mongoose, { mongo } from 'mongoose'
import slugify from 'slugify'

const productSchema = new mongoose.Schema(
    {
        images: [String],
        title: { type: String, required: true },
        description: String,
        price: {
            mrp: Number,
            discountedPrice: Number
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        quantity: Number,
        slug: { type: String, unique: true },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

productSchema.pre('save', function () {
    this.slug = slugify(this.title, { lower: true })
})

export default mongoose.model('Product', productSchema)
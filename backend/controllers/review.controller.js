import Review from '../models/Review.js'

export const addReview = async (req, res) => {
    const review = await Review.create({
        ...req.body,
        user_id: req.user.id
    })

    res.status(201)
    res.json(review)
}

export const getReviews = async (req, res) => {
    const reviews = await Review.find({ product_id: req.params.productId })
    res.json(reviews)
}
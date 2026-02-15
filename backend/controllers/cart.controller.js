import Cart from '../models/Cart.js'

export const addToCart = async (req, res) => {
    const items = await Cart.create({
        user_id: req.user.id,
        product_info: req.body.products.map((item) => {
            return {
                product: item.id,
                qunatity: item.quantity
            }
        })
    })

    res.status(201)
    res.json(items)
}

export const getCartItems = async (req, res) => {
    const cart = await Cart.find({ user_id: req.user.id }).populate('products')
    res.json(cart)
}

export const removeCart = async (req, res) => {
    const cart = await Cart.find({ user_id: req.user.id })
    await Cart.findByIdAndDelete(cart._id)

    res.status(204)
    res.json({})
}
import Order from '../models/Order.js'

export const createOrder = async (req, res) => {
    const order = await Order.create({
        ...req.body,
        user_id: req.user._id
    })

    res.status(201)
    res.json(order)
}

export const getUserOrders = async (req, res) => {
    const orders = await Orders.find({ user_id: req.user._id })
        .populate('products')
    res.json(orders)
}

export const updateOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
    order.status = req.body.status
    await order.save()
    res.json(order)
}
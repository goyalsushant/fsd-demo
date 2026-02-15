import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        admin: req.user._id
    })

    res.status(201)
    res.json({ message: 'Product created successfully' })
}

export const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductBySlug = async (req, res) => {
    const product = await Product.find({ slug: req.params.slug })
    res.json(product)
}

export const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.status(204)
    res.json({message: 'Product Deleted'})
}
import Category from '../models/Category.js'

export const createCategory = async (req, res) => {
    const category = await Category.create(req.body)
    res.status(201)
    res.json(category)
}

export const getCategory = async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
}
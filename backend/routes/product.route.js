import { Router } from "express"
import { createProduct, deleteProduct, getAllProducts, getProductBySlug, updateProduct } from "../controllers/product.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.get('/', getAllProducts)
router.get('/:slug', getProductBySlug)
router.post('/', auth, createProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)

export default router
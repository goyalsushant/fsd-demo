import { Router } from "express"
import { addToCart, getCartItems, removeCart, removeCart } from "../controllers/cart.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.post('/', auth, addToCart)
router.get('/', auth, getCartItems)
router.delete('/', auth, removeCart)

export default router
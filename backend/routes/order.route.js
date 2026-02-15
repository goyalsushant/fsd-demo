import { Router } from "express"
import { createOrder, getUserOrders, updateOrder } from "../controllers/order.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.post('/', auth,createOrder)
router.get('/', auth,getUserOrders)
router.put('/:id', auth,updateOrder)

export default router
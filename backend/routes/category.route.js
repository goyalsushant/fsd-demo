import { Router } from "express"
import { createCategory, getCategory } from "../controllers/category.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.post('/', auth, createCategory)
router.get('/', getCategory)

export default router
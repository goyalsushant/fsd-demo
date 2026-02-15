import {Router} from "express"
import { getUserProfile, login, register } from "../controllers/user.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/profile', auth, getUserProfile)

export default router
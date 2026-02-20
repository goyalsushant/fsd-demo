import { Router } from "express"
import { addReview, getReviews } from "../controllers/review.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review management APIs
 */

router.post('/', auth, addReview)
router.get('/', getReviews)

export default router
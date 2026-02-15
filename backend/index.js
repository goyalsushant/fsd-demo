import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import mongoose from './config/db.js'
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'
import reviewRoutes from './routes/review.route.js'
import categoryRoutes from './routes/category.route.js'

import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/review', reviewRoutes)
app.use('/category', categoryRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port ${process.env.PORT}`)
})
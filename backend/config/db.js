import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?appName=${process.env.DB_CLUSTER}`)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Error in database connection', err))

export default mongoose
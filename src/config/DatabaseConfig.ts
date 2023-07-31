import mongoose from 'mongoose'
import env from './EnvConfig'

const connectDB = async () => {
  try {
    if (!env.mongodbUrl) {
      throw new Error('MONGODB_URL is not defined in environment variables')
    }

    await mongoose.connect(env.mongodbUrl)

    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err)
    process.exit(1)
  }
}

export {mongoose}
export default connectDB

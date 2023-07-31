import dotenv from 'dotenv'

dotenv.config()

const env = {
  port : process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
}

export default env
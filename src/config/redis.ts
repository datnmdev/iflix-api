import dotenv from 'dotenv'
import { createClient } from 'redis'

dotenv.config()

const REDIS_HOST = process.env.REDIS_HOST as string
const REDIS_PORT = Number.parseInt((process.env.REDIS_PORT as string))
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string

const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})

redisClient.on('error', err => {
  console.log(err)
})

redisClient.once('connect', () => {
  console.log('Connected to redis!')
})

export {
  redisClient
}

export default function redisConfig() {
  redisClient.connect()
}
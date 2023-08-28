import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL as string

const mongooseConnection = mongoose.connection

mongooseConnection.on('error', err => {
  console.log(err)
})

mongooseConnection.once('open', () => {
  console.log('Connected to mongoDB!')
})

export default function databaseConfig() {
  mongoose.connect(MONGODB_URL)
}
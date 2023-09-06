import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const PRIVATE_KEY_PATH = process.cwd() + process.env.PRIVATE_KEY_PATH
const CERTIFICATE_PATH = process.cwd() +  process.env.CERTIFICATE_PATH

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8')
const certificate = fs.readFileSync(CERTIFICATE_PATH, 'utf-8')

const credentials = {
  key: privateKey,
  cert: certificate
}

export default credentials
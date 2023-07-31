import express from 'express'

import env from './config/EnvConfig'
import connectDB, {mongoose} from './config/DatabaseConfig'

const app = express()
connectDB().catch((err) => console.log(err))

app.listen(env.port, () => {
  console.log(`Server started on port ${env.port}`)
})


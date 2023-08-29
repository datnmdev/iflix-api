import express from 'express'

import appConfig from './config'

const app = express()

// Apply all the app configurations
appConfig(app)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
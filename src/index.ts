// import https from 'https'

// import app, { credentials } from './config'

// const httpsServer = https.createServer(credentials, app)

// httpsServer.listen(process.env.PORT, () => {
//   console.log(`Server is running on https://localhost:${process.env.PORT}`)
// })

import app from './config'

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
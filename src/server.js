'use strict'

require('dotenv').config()
const app = require('express')()

const apiConfig = require('./api/config')
const swagger = require('./middlewares/swagger')
const mongoose = require('./drivers/mongoose')

const PORT = 8080
const HOST = '0.0.0.0'
;(async function () {
  try {
    await mongoose.connectToServer()

    const swaggerConfig = await apiConfig.generate()

    const swaggerMiddlewares = await swagger.generateMiddlewares(swaggerConfig)
    app.use(swaggerMiddlewares)
  } catch (e) {
    console.error(e)
  }

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)
})()

'use strict'

const app = require('express')()

const apiConfig = require('./api/config')
const swagger = require('./middlewares/swagger')

const PORT = 8080
const HOST = '0.0.0.0'
;(async function () {
  try {
    const swaggerConfig = await apiConfig.generate()

    const swaggerMiddlewares = await swagger.generateMiddlewares(swaggerConfig)
    app.use(swaggerMiddlewares)
  } catch (e) {
    console.error(e)
  }

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)
})()

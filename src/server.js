'use strict'

const app = require('express')()
const path = require('path')

const swaggerTools = require('swagger-tools')
const swaggerCombine = require('swagger-combine')

const PORT = 8080
const HOST = '0.0.0.0'

;(async function () {
  try {
    const swaggerDoc = await swaggerCombine(
      path.join(__dirname, 'api/swagger.yml')
    )

    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata())

      // Validate Swagger requests
      app.use(middleware.swaggerValidator())

      // Route validated requests to appropriate controller
      app.use(
        middleware.swaggerRouter({
          controllers: path.join(__dirname, './controllers'),
          useStubs: false
        })
      )

      // Serve the Swagger documents and Swagger UI
      app.use(middleware.swaggerUi())
    })
  } catch (e) {
    console.error(e)
  }

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)
})()

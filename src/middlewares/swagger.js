const swagger = require('swagger-tools')

module.exports.generateMiddlewares = config => {
  return new Promise(resolve => {
    swagger.initializeMiddleware(config.definitions, middleware => {
      const middlewares = []
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      middlewares.push(middleware.swaggerMetadata())

      // Validate Swagger requests
      middlewares.push(middleware.swaggerValidator())

      // Route validated requests to appropriate controller
      middlewares.push(middleware.swaggerRouter(config.routerConfig))

      // Serve the Swagger documents and Swagger UI
      middlewares.push(middleware.swaggerUi())

      resolve(middlewares)
    })
  })
}

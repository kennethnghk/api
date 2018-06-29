const path = require('path');

const swaggerCombine = require('swagger-combine')

module.exports = {
    async generate()  {
   

        const definitions = await swaggerCombine(
            path.join(__dirname, './swagger.yml')
          )
      

          const routerConfig = {
            controllers: path.join(__dirname, '../controllers'),
            useStubs: false
          }

       return {
           definitions,
           routerConfig
       }
}
}
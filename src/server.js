'use strict'

require('dotenv').config()
const app = require('express')()

const apiConfig = require('./api/config')
const swagger = require('./middlewares/swagger')

// to be refactored
const mongoose = require('mongoose')
const database = 'api'
mongoose.connect(
  'mongodb://' +
    process.env.MONGODB_USER +
    ':' +
    process.env.MONGODB_PASS +
    '@' +
    process.env.MONGODB_HOST +
    '/' +
    database
)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('connected Mongo')

  var kittySchema = mongoose.Schema({
    name: String
  })

  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? 'Meow name is ' + this.name
      : "I don't have a name"
    console.log(greeting)
  }

  var Kitten = mongoose.model('Kitten', kittySchema)

  var silence = new Kitten({ name: 'Silence' })

  silence.save(function (err, fluffy) {
    if (err) return console.error(err)
    fluffy.speak()
  })
})
//

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

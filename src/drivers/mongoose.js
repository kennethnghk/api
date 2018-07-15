'use strict'

const mongoose = require('mongoose')
const database = 'api'

const dbUrl =
  'mongodb://' +
  process.env.MONGODB_USER +
  ':' +
  process.env.MONGODB_PASS +
  '@' +
  process.env.MONGODB_HOST +
  '/' +
  database

mongoose.Promise = global.Promise
mongoose.connectToServer = async () => {
  if (mongoose.connection.readyState !== 1) {
    // State.connected
    await mongoose.connect(dbUrl)
    console.log(`Connected to MongoDB at ${dbUrl}`)
  }
  return mongoose
}

module.exports = mongoose

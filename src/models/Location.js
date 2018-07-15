'use strict'

const mongoose = require('../drivers/mongoose')
const schema = require('./schemas/Location')

module.exports = mongoose.model('location', schema)

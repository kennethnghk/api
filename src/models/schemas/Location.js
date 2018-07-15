'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema(
  {
    lat: {
      type: Schema.Types.Number,
      required: true
    },
    lng: {
      type: Schema.Types.Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

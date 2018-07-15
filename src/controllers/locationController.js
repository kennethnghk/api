const Location = require('../models/Location')

module.exports = {
  createLocation: async (req, res, next) => {
    const { lat, lng } = req.body

    const location = new Location({ lat, lng })
    location.save().then(() => console.log('location saved'))

    return res.json(location._doc)
  }
}

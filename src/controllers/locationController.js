module.exports = {
  createLocation: async (req, res, next) => {
    const { lat, lng } = req.body
    const result = { lat, lng }
    return res.json(result)
  }
}

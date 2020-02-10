const jwt = require('../helpers/jwt')
const { User } = require('../models/index')
module.exports = {
  authentication: function(req, res, next) {
    try {
      let { token } = req.headers
      console.log('ini tokennya', token)

      let payload = jwt.verifyToken(token, process.env.JWT_SECRET)
      console.log('ini payloadnya', payload)

      User.findOne({
        where: {
          id: payload.id
        }
      })
        .then(result => {
          console.log('masuk ke result', result)

          if (result) {
            req.user = payload
            next()
          } else {
            res.status(404).json('please login')
          }
        })
        .catch(err => {
          console.log('error masuk sini dlu')
          res.status(400).json(err)
        })
      next()
    } catch (error) {
      console.log('error di jwt', error)
      res.status(400).json(error)
    }
  }
}

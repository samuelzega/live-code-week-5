const { Comic } = require('../models/index')

module.exports = class {
  static getComic(req, res, next) {
    // console.log(Comic)

    Comic.findAll()
      .then(result => {
        console.log('masuk sini', result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log('langsung ke error', err)
        res.status(400).json(err)
      })
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Comic.findOne({
      where: {
        id
      }
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static update(req, res, next) {
    let { author, imageUrl, title } = req.body
    Comic.update(
      {
        author,
        imageUrl,
        title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

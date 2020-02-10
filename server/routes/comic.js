var express = require('express')
var router = express.Router()
const comic = require('../controllers/ComicController')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', comic.getComic)
router.get('/findOne/:id', comic.findOne)
router.post('/findOne/:id', comic.update)

module.exports = router

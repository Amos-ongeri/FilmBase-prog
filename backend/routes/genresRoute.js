const { genresCon } = require('../controllers/genresCon')
const router = require('express').Router()

router.get('/:type/genres', genresCon)

module.exports = router
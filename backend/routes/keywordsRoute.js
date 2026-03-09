const { keywordCon } = require('../controllers/keywordsCon')
const router = require('express').Router()

router.get('/search', keywordCon)

module.exports = router
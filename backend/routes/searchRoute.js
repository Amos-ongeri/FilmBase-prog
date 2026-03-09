const { searchCon } = require('../controllers/searchController')
const router = require('express').Router()

router.get('/search/multi', searchCon)

module.exports = router
const { similarCon, moviesCon,
    detailsCon, videosCon,
    creditsCon, genreCon,
    reviewsCon, trendingCon,
    discoverCon, imagesCon,
    configsCon
} = require('../controllers/controllers');

const router = require('express').Router()

router.get('/:media_type/:category/:page/list',moviesCon)
router.get('/:id/:media_type/details', detailsCon)
router.get('/:id/:media_type/videos',videosCon)
router.get('/:id/:media_type/credits',creditsCon)
router.get('/:id/:media_type/similar',similarCon)
router.get('/:type/genres', genreCon)
router.get('/:id/:media_type/reviews', reviewsCon)
router.get('/:media_type/:time_window/trending', trendingCon)
router.get('/discover/:type/:page', discoverCon)
router.get('/:media_type/:id/images', imagesCon)
router.get("/configurations", configsCon)

module.exports = router
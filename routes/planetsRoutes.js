const express = require('express')
const router = express.Router()
const PlanetController = require('../controllers/PlanetController')

router.get('/mercury', PlanetController.mercury)
router.get('/venus', PlanetController.venus)
router.get('/earth', PlanetController.earth)
router.get('/mars', PlanetController.mars)
router.get('/jupiter', PlanetController.jupiter)
router.get('/saturn', PlanetController.saturn)
router.get('/uranus', PlanetController.uranus)
router.get('/neptune', PlanetController.neptune)

module.exports = router
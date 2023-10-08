const express = require('express')
const router = express.Router()
const PlaceController = require('../controllers/PlaceController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, PlaceController.createPlace)
router.post('/add', checkAuth, PlaceController.createPlaceSave)
router.get('/edit/:id', checkAuth, PlaceController.updatePlace)
router.post('/edit', checkAuth, PlaceController.updatePlaceSave)
router.get('/dashboard', checkAuth, PlaceController.dashboard)
router.post('/remove', checkAuth, PlaceController.removePlace)
router.get('/', PlaceController.showPlaces)

module.exports = router
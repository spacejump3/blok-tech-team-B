const express = require('express')
const router = express.Router()

const favoritesController = require('../controllers/favorites.js')

router.get('/', favoritesController.favorites)

module.exports = router
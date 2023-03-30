const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/', restaurantController.createRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);

module.exports = router;

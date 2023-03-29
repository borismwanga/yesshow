const express = require('express');
const { reviewController } = require('../controllers');

const router = express.Router();

router.post('/restaurants/:id/reviews', reviewController.createReview);

module.exports = router;

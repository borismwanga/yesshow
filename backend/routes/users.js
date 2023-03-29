const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/users/me', userController.getUser);

module.exports = router;

const express = require('express');
const router = express.Router();

const userRoutes = require('./user-api');
const eventRoutes = require('./event-api');
const dmvRoutes = require('./dmv-api');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/dmv', dmvRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/next', async (req, res) => {
    try {
        const count = await Event.countDocuments({status: 'pending'});
        if (count === 0) {
            return res.status(404).json({message: 'No pending events found'});
        }
        const random = Math.floor(Math.random() * count);
        const event = await Event.findOne({status: 'pending'}).skip(random);
        res.json(event);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
    try {
        const {eventId, userId, decision, issueReason} = req.body;

        const event = await Event.findById(eventId);
        if (event) {
            event.status = decision;
            if (issueReason) event.rejectionReason = issueReason;
            event.annotatedBy = userId;
            event.annotatedAt = new Date();
            await event.save();
        }

        res.json({success: true});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;

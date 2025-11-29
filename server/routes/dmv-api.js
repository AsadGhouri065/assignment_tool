const express = require('express');
const router = express.Router();

// Mock DMV database - vehicle options
const VEHICLE_MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
const VEHICLE_MODELS = ['Camry', 'Civic', 'F-150', 'Malibu', 'Altima'];
const VEHICLE_COLORS = ['Silver', 'Black', 'White', 'Blue', 'Red'];

router.post('/lookup', (req, res) => {
    try {
        const { plateNumber } = req.body;

        if (!plateNumber || typeof plateNumber !== 'string') {
            return res.status(400).json({ error: 'Plate number is required' });
        }

        // Return random vehicle information for demo purposes
        const make = VEHICLE_MAKES[Math.floor(Math.random() * VEHICLE_MAKES.length)];
        const model = VEHICLE_MODELS[Math.floor(Math.random() * VEHICLE_MODELS.length)];
        const color = VEHICLE_COLORS[Math.floor(Math.random() * VEHICLE_COLORS.length)];

        res.json({
            plateNumber: plateNumber.toUpperCase(),
            make,
            model,
            color
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to lookup plate number' });
    }
});

module.exports = router;

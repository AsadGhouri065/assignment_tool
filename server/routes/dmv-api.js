const express = require('express');
const router = express.Router();

router.post('/lookup', (req, res) => {
    const { plateNumber } = req.body;

    const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
    const models = ['Camry', 'Civic', 'F-150', 'Malibu', 'Altima'];
    const colors = ['Silver', 'Black', 'White', 'Blue', 'Red'];

    const hash = plateNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const make = makes[hash % makes.length];
    const model = models[hash % models.length];
    const color = colors[hash % colors.length];

    res.json({
        plateNumber,
        make,
        model,
        color
    });
});

module.exports = router;

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    plateImageId: { type: String, required: true },
    plateNumber: { type: String }, // The correct plate number (for verification/demo)
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    rejectionReason: { type: String },
    annotatedBy: { type: String },
    annotatedAt: { type: Date }
});

module.exports = mongoose.model('Event', EventSchema);

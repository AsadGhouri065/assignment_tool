// const mongoose = require('mongoose');
//
// const annotationSchema = new mongoose.Schema({
//     eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     licensePlateNumber: { type: String },
//     dmvData: {
//         make: String,
//         model: String,
//         color: String
//     },
//     decision: { type: String, enum: ['accepted', 'rejected'], required: true },
//     issueReason: { type: String },
//     annotationTimeSeconds: { type: Number }, // Time taken to annotate
//     createdAt: { type: Date, default: Date.now }
// });
//
// module.exports = mongoose.model('Annotation', annotationSchema);

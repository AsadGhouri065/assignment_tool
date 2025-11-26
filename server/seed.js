const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/annotation_tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const seedEvents = [
    {
        videoId: '/public/videos/violation_1.mp4',
        plateImageId: '/public/plates/image_1.jpg',
        plateNumber: '777 777',
        status: 'pending'
    },
    {
        videoId: '/public/videos/violation_2.mp4',
        plateImageId: '/public/plates/image_2.jpg',
        plateNumber: 'GGG GGG',
        status: 'pending'
    },
    {
        videoId: '/public/videos/violation_3.mp4',
        plateImageId: '/public/plates/image_3.jpg',
        plateNumber: '3A 73 69',
        status: 'pending'
    },
    {
        videoId: '/public/videos/violation_4.mp4',
        plateImageId: '/public/plates/image_4.jpg',
        plateNumber: 'AB CD 10',
        status: 'pending'
    },
    {
        videoId: '/public/videos/violation_5.mp4',
        plateImageId: '/public/plates/image_5.jpg',
        plateNumber: '90 23 19',
        status: 'pending'
    }
];

const seedDB = async () => {
    await Event.deleteMany({});
    await Event.insertMany(seedEvents);
    console.log('Database Seeded!');
    mongoose.connection.close();
};

seedDB();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/annotation_tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const seedUsers = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin',
        name: 'Admin User',
        role: 'admin'
    },
    {
        username: 'annotator1',
        email: 'annotator1@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'annotator'
    },
    {
        username: 'annotator2',
        email: 'annotator2@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'annotator'
    }
];

const seedDB = async () => {
    try {
        // hash passwords before inserting
        const saltRounds = 10;
        const usersWithHashedPasswords = await Promise.all(
            seedUsers.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                return { ...user, password: hashedPassword };
            })
        );

        await User.deleteMany({});
        await User.insertMany(usersWithHashedPasswords);
        console.log('Users Seeded with hashed passwords!');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
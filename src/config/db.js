const mongoose = require('mongoose');
const mongoDb = process.env.MONGODB_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

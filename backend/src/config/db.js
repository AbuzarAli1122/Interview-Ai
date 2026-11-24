const moongoose = require('mongoose');


const connectDB = async () => {
    try{
        await moongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');

    }catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB  
const mongoose = require("mongoose");
const mongoURI =
    process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDb connected")
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDB;




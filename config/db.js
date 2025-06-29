const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.error(
      "Make sure MongoDB is running locally or update MONGODB_URI to use MongoDB Atlas"
    );
    process.exit(1);
  }
};

module.exports = connectDB;

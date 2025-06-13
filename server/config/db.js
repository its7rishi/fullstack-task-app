const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    // Attempt to connect to DB using URI
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.error("MongoDB connection error: ", err)
    process.exit(1)
  }
}

module.exports = connectDB

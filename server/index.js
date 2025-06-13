const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")

const app = express()
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

// Middleware for handling CORS
app.use(cors())
// Middleware to parse JSON requests
app.use(express.json())

// Routes
app.use("/api/tasks", taskRoutes)

// Basic route for testing server
app.get("/", (req, res) => {
  res.send("Task Manager backend is running!")
})

// Start the server
// ! IMPORTANT: For Vercel export the app instance,
// ! Vercel handles starting the server internally.
module.exports = app

// listen to development localhost
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

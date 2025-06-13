const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require("../config/db")
const taskRoutes = require("../routes/taskRoutes")

const app = express()
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

// Middleware to parse JSON requests
app.use(express.json())

// Configure Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://enchanting-entremet-1fafa2.netlify.app",
]

// Middleware for handling CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin"
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

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

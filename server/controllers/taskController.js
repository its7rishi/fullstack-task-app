const Task = require("../models/Task") // Import the Task Mongoose model

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    // Find all tasks in the database and sort them by creation date (descending)
    const tasks = await Task.find().sort({ createdAt: -1 })
    // Send the tasks as a JSON response with a 200 OK status
    res.status(200).json(tasks)
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
    console.error("Error fetching tasks:", error)
    res.status(500).json({ message: "Server error fetching tasks" })
  }
}

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { title } = req.body // Extract title from request body
    // If title is missing, send a 400 Bad Request
    if (!title) {
      return res.status(400).json({ message: "Task title is required" })
    }
    // Create a new Task instance
    const newTask = new Task({ title })
    // Save the new task to the database
    await newTask.save()
    // Send the created task as a JSON response with a 201 Created status
    res.status(201).json(newTask)
  } catch (error) {
    console.error("Error adding task:", error)
    res.status(500).json({ message: "Server error adding task" })
  }
}

// Toggle task completed status
exports.toggleTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params // Get task ID from URL parameters
    const { completed } = req.body // Get updated completed status from request body

    // Find the task by ID and update its 'completed' status
    // { new: true } returns the modified document rather than the original
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    )

    // If task not found, send a 404 Not Found
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    // Send the updated task as a JSON response
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ message: "Server error updating task" })
  }
}

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params // Get task ID from URL parameters
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(id)

    // If task not found, send a 404 Not Found
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    // Send a 204 No Content status for successful deletion (no body returned)
    res.status(204).send()
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ message: "Server error deleting task" })
  }
}

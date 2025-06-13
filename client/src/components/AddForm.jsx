import React, { useState, useContext } from "react"
import { TaskContext } from "../context/TaskContext"

const AddForm = () => {
  const [title, setTitle] = useState("")
  // Get AddTask function from the TaskContext
  const { addTask } = useContext(TaskContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim) {
      // Ensure title is not empty
      addTask(title)
      setTitle("")
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter new task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition duration-200"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}
export default AddForm

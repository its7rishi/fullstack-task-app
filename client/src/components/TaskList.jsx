import React, { useContext } from "react"
import { TaskContext } from "../context/TaskContext"

const TaskList = () => {
  const { tasks, loading, error, toggleTaskCompleted, deleteTask } =
    useContext(TaskContext)

  if (loading)
    return <p className="text-center text-blue-600">Loading Tasks...</p>

  if (error) return <p className="text-center text-red-600">Error: {error}</p>

  if (tasks.length === 0)
    return <p className="text-center text-gray-500">No Tasks yet. Add some!</p>
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between  py-3"
          >
            <span
              className={`flex-1 text-lg cursor-pointer ${
                task.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
              onClick={() => toggleTaskCompleted(task)}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TaskList

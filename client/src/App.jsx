import React, { useEffect, useContext } from "react"
import { TaskProvider, TaskContext } from "./context/TaskContext"
import AddTaskForm from "./components/AddForm"
import TaskList from "./components/TaskList"
import "./index.css"

function AppContent() {
  const { fetchTasks } = useContext(TaskContext)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-blue-800 tracking-tight">
          React Full-Stack Task Manager
        </h1>
        <p className="text-lg text-gray-600 mt-2 text-center">
          Powered by 'useReducer', 'useContext', 'useCallback', 'useMemo'
        </p>
      </header>
      <div className="w-full max-w-2xl">
        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  )
}

// Wrapper for AppContent to provide TaskContext
// This is where global state is managed
function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}

export default App

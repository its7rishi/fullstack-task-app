import React, {
  useReducer,
  useCallback,
  useMemo,
  createContext,
  Children,
} from "react"
import axios from "axios"

// Initial State
const initialState = {
  tasks: [],
  loading: true,
  error: null,
}

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, loading: false, error: null }
    case "FETCH_TASKS_FAILURE":
      return { ...state, loading: false, error: action.payload }
    case "ADD_TASK":
      // Add new task to beginning of the array
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case "TOGGLE_TASK_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      }
    default:
      return state
  }
}

// Create a Context Object
export const TaskContext = createContext(initialState)

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // const API_BASE_URL = "http://localhost:5000/api/tasks"
  const API_BASE_URL =
    "https://vercel.com/its7rishis-projects/fullstack-task-app/3MoyXGfsBquYvejzhLQyaXETY8zS/api/tasks"

  const fetchTasks = useCallback(async () => {
    dispatch({ type: "LOADING" })
    try {
      const response = await axios.get(API_BASE_URL)
      dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data })
    } catch (error) {
      dispatch({ type: "FETCH_TASKS_FAILURE", payload: error.message })
      console.error("Failed to fetch tasks", error)
    }
  }, [])

  const addTask = useCallback(async (title) => {
    try {
      const response = await axios.post(API_BASE_URL, { title })
      dispatch({ type: "ADD_TASK", payload: response.data })
    } catch (error) {
      console.error("Failed to create task", error)
    }
  }, [])

  const toggleTaskCompleted = useCallback(async (task) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${task._id}`, {
        completed: !task.completed,
      })
      dispatch({ type: "TOGGLE_TASK_COMPLETED", payload: response.data })
    } catch (error) {
      console.error("Failed to toggle task completed status: ", error)
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
      dispatch({ type: "DELETE_TASK", payload: id })
    } catch (error) {
      console.error("Failed to delete task: ", error)
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      tasks: state.tasks,
      loading: state.loading,
      error: state.error,
      fetchTasks,
      addTask,
      toggleTaskCompleted,
      deleteTask,
    }),
    [
      state.tasks,
      state.loading,
      state.error,
      fetchTasks,
      addTask,
      toggleTaskCompleted,
      deleteTask,
    ]
  )

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  )
}

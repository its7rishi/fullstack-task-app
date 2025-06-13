const express = require("express")
const {
  getTasks,
  addTask,
  toggleTaskCompleted,
  deleteTask,
} = require("../controllers/taskController")

const router = express.Router()

router.get("/", getTasks)
router.post("/", addTask)
router.put("/:id", toggleTaskCompleted)
router.delete("/:id", deleteTask)

module.exports = router

const express = require("express")


const {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, getWorkouts)
router.get("/:id", protect, getWorkout)
router.post("/", protect, createWorkout)
router.patch("/:id", protect, updateWorkout)
router.delete("/:id", protect, deleteWorkout)

module.exports = router
const express = require("express")


const {
    createWorkout,
    getWorkouts,
    getWorkout,
} = require("../controllers/workoutController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, getWorkouts)
router.get("/:id", protect, getWorkout)
router.post("/", protect, createWorkout)

module.exports = router
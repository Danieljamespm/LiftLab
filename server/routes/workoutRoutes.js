const express = require("express")


const {
    createWorkout,
    getWorkout,
} = require("../controllers/workoutController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, getWorkout)
router.post("/", protect, createWorkout)

module.exports = router
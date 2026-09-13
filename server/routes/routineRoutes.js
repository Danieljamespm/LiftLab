const express = require("express")
const { getRoutines,
    getRoutineById,
    createRoutine,
    deleteRoutine,
    updateRoutine,
} = require("../controllers/routineController")
const protect = require("../middleware/authMiddleware")


const router = express.Router()

router.get("/", protect, getRoutines)
router.get("/:id", getRoutineById)
router.post("/", protect, createRoutine)
router.delete("/:id", deleteRoutine)
router.patch("/:id", updateRoutine)

module.exports = router
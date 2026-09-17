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
router.get("/:id", protect, getRoutineById)
router.post("/", protect, createRoutine)
router.delete("/:id", protect, deleteRoutine)
router.patch("/:id", protect, updateRoutine)

module.exports = router
const express = require("express")
const { getRoutines,
    getRoutineById,
    createRoutine,
    deleteRoutine,
} = require("../controllers/routineController")


const router = express.Router()

router.get("/", getRoutines)
router.get("/:id", getRoutineById)
router.post("/", createRoutine)
router.delete("/:id", deleteRoutine)

module.exports = router
const express = require("express")
const { getRoutines,
    getRoutineById,
    createRoutine,
} = require("../controllers/routineController")


const router = express.Router()

router.get("/", getRoutines)
router.get("/:id", getRoutineById)
router.post("/", createRoutine)

module.exports = router
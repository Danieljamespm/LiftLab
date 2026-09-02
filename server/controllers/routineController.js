const Routine = require("../models/Routine")

const getRoutines = async (req, res) => {
    const routines = await Routine.find()

    res.status(201).json(routines)
}

const createRoutine = async (req, res) => {
    const { routineName, routineExercises } = req.body

    const routine = await Routine.create({
        routineName,
        routineExercises
    })

    res.status(201).json(routine)
}

const getRoutineById = async (req, res) => {
    const routine = await Routine.findById(req.params.id)

    res.status(200).json(routine)
}
















module.exports = {
    getRoutines,
    createRoutine,
    getRoutineById

}
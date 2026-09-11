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


const deleteRoutine = async (req, res) => {
    const routine = await Routine.findByIdAndDelete(req.params.id)

    res.status(200).json(routine)
}

const updateRoutine = async (req, res) => {
    const routine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(routine)
}















module.exports = {
    getRoutines,
    createRoutine,
    getRoutineById,
    deleteRoutine,
    updateRoutine,


}
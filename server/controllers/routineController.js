const Routine = require("../models/Routine")

const getRoutines = async (req, res) => {
    const routines = await Routine.find({ user: req.user._id })

    res.status(200).json(routines)
}

const createRoutine = async (req, res) => {

    try {
        const { routineName, routineExercises } = req.body

        const routine = await Routine.create({
            routineName,
            routineExercises,
            user: req.user._id
        })

        res.status(201).json(routine)
    } catch (error) {
        return res.status(400).json({ message: "Invalid routine data" })
    }

}

const getRoutineById = async (req, res) => {

    try {
        const routine = await Routine.findOne({ _id: req.params.id, user: req.user._id })

        if (!routine) {
            return res.status(404).json({ message: "Routine not found" })
        }

        res.status(200).json(routine)

    } catch (error) {
        return res.status(400).json({ messge: "Invalid routine ID" })
    }



}


const deleteRoutine = async (req, res) => {

    try {
        const routine = await Routine.findOneAndDelete({ _id: req.params.id, user: req.user._id })

        if (!routine) {
            return res.status(404).json({ message: "Routine not found" })
        }

        res.status(200).json(routine)

    } catch (error) {
        return res.status(400).json({ message: "Invalid routine ID" })
    }

}

const updateRoutine = async (req, res) => {

    try {
        const routine = await Routine.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })

        if (!routine) {
            return res.status(404).json({ message: "Routine not found" })
        }

        res.status(200).json(routine)
    } catch (error) {

        return res.status(400).json({ message: "Invalid routine ID" })
    }

}















module.exports = {
    getRoutines,
    createRoutine,
    getRoutineById,
    deleteRoutine,
    updateRoutine,


}
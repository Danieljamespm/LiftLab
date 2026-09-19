const Workout = require("../models/Workout")
const Routine = require("../models/Routine")

const createWorkout = async (req, res) => {

    try {
        const { routine, workoutName, workoutExercises } = req.body

        if (!workoutName) {
            return res.status(400).json({ message: "Workout name is required" })
        }
        if (routine) {

            const routineExist = await Routine.findOne({ _id: routine, user: req.user._id })


            if (!routineExist) {
                return res.status(404).json({ message: "Routine not found" })
            }
        }


        const workout = await Workout.create({
            routine,
            workoutName,
            workoutExercises,
            user: req.user._id
        })
        res.status(201).json(workout)
    } catch (error) {

        return res.status(500).json({ message: "Server Error" })
    }

}

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user._id })

        res.status(200).json(workouts)
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

const getWorkout = async (req, res) => {
    try {

        const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id })

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" })
        }

        res.status(200).json(workout)
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }


}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
}
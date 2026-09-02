const mongoose = require("mongoose")



const exerciseSchema = new mongoose.Schema({
    bodyParts: [String],
    equipments: [String],
    exerciseId: String,
    gifUrl: String,
    instructions: [String],
    name: String,
    secondaryMuscles: [String],
    targetMuscles: [String],
},
    {
        _id: false,
    }
)



const routineSchema = new mongoose.Schema({
    routineName: {
        type: String,
        required: true,
    },

    routineExercises: {
        type: [exerciseSchema],
        default: [],
    }

})


const Routine = mongoose.model("Routine", routineSchema)

module.exports = Routine
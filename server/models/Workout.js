const mongoose = require("mongoose")

const setSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false
    } 
        
})

const workoutExerciseSchema = new mongoose.Schema({
    exerciseId:{ 
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    note: String,
    
    restTimer: {
        type: Number,
        default: 0,
    },
    sets: {
        type: [setSchema],
        default: [],
    }
})

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    routine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Routine",
    },
    workoutName: {
        type: String,
        required: true,
    },
    startedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
    workoutExercises: {
        type: [workoutExerciseSchema],
        default: [],
    },
})


const Workout = mongoose.model("Workout", workoutSchema)
module.exports = Workout
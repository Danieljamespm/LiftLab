import React from 'react'

const StartWorkoutButton = ({ routine, user }) => {

    const handleStartWorkout = async () => {
        const workoutExercises = routine.routineExercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            name: exercise.name,
            restTimer: 0,
            sets: []
        }))

        const response = await fetch('http://localhost:5000/api/workouts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                routine: routine._id,
                workoutName: routine.routineName,
                workoutExercises
            })
        })

        const data = await response.json()
        console.log(data)
    }

    return (
        <div>
            <button
                className='save-btn'
                onClick={handleStartWorkout}
            >
                Start Workout
            </button>
        </div>
    )
}

export default StartWorkoutButton

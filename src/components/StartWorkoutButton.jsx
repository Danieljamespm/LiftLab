import React from 'react'
import { Navigate, useNavigate } from 'react-router'

const StartWorkoutButton = ({ routine, user }) => {

    const navigate = useNavigate()

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

        if (!response.ok) {
            console.log(data.message)
            return
        }
        navigate(`/workout/${data._id}`)
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

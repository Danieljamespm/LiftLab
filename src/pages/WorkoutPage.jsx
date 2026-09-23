import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const WorkoutPage = ({ user }) => {

    const [workout, setWorkout] = useState(null)

    const { id } = useParams()


    useEffect(() => {
        const fetchWorkout = async () => {

            try {
                const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                })

                const data = await response.json()

                if (!response.ok) {
                    console.log(data.message)
                    return
                }
                console.log(data)
                setWorkout(data)


            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkout()
    }, [id, user])


    if (!workout) {
        return <p>Loading...</p>
    }

    const handleAddSet = (workoutExerciseId) => {

        const updatedExercises = workout.workoutExercises.map((exercise) => {
            if (exercise._id === workoutExerciseId) {

                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        {
                            weight: 0,
                            reps: 0,
                            completed: false
                        }
                    ]
                }
            }
            return exercise
        })

        setWorkout({ ...workout, workoutExercises: updatedExercises })


    }





    return (
        <div>
            <h1>{workout.workoutName}</h1>
            <div>
                {workout.workoutExercises.map((exercise) => (
                    <div key={exercise._id}>
                        <h2>{exercise.name}</h2>

                        <div>
                            {exercise.sets.map((_, index) => (
                                <div key={index}>Set {index + 1}</div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleAddSet(exercise._id)}
                        >
                            + Add Set

                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorkoutPage
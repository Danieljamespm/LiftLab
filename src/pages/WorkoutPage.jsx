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
                            weight: "",
                            reps: "",
                            completed: false
                        }
                    ]
                }
            }
            return exercise
        })

        setWorkout({ ...workout, workoutExercises: updatedExercises })


    }

    const updateSetWeight = (exercise, setIndex, newWeight) => {

        const updatedExercises = workout.workoutExercises.map((currentExercise) => {
            if (exercise._id === currentExercise._id) {
                const updatedSets = currentExercise.sets.map((currentSet, index) => {
                    if (setIndex === index) {
                        return { ...currentSet, weight: newWeight }
                    }
                    return currentSet
                })
                return {
                    ...currentExercise,
                    sets: updatedSets
                }

            }
            return currentExercise
        })
        setWorkout({ ...workout, workoutExercises: updatedExercises })
    }

    const updateSetReps = (exercise, setIndex, newReps) => {
        const updatedExercises = workout.workoutExercises.map((currentExercise) => {
            if (exercise._id === currentExercise._id) {
                const updatedSets = currentExercise.sets.map((currentSet, index) => {
                    if (setIndex === index) {
                        return {
                            ...currentSet,
                            reps: newReps
                        }
                    }
                    return currentSet
                })
                return {
                    ...currentExercise,
                    sets: updatedSets
                }
            }
            return currentExercise
        })
        setWorkout({ ...workout, workoutExercises: updatedExercises })
    }

    const updateSetCompleted = (exercise, setIndex, newCompleted) => {
        const updatedExercises = workout.workoutExercises.map((currentExercise) => {
            if (exercise._id === currentExercise._id) {
                const updatedSets = currentExercise.sets.map((currentSet, index) => {
                    if (setIndex === index) {
                        return {
                            ...currentSet,
                            completed: newCompleted
                        }
                    }
                    return currentSet
                })
                return {
                    ...currentExercise,
                    sets: updatedSets
                }
            }
            return currentExercise
        })
        setWorkout({ ...workout, workoutExercises: updatedExercises })
        saveWorkout(updatedExercises)
    }

    const saveWorkout = async (updatedExercises) => {
        console.log("SAVE WORKOUT FIRED", updatedExercises)
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    workoutExercises: updatedExercises
                })
            })


        } catch (error) {

        }
    }





    return (
        <div>
            <h1>{workout.workoutName}</h1>
            <div>
                {workout.workoutExercises.map((exercise) => (
                    <div key={exercise._id}>
                        <h2 className='exercise-title'>{exercise.name}</h2>

                        <div className='exercise-data'>

                            <div className='exercise-label'>
                                <span>SET</span>
                                <span>WEIGHT</span>
                                <span>REPS</span>
                                <span> ✓</span>
                            </div>
                            {exercise.sets.map((set, index) => (
                                <div key={index}>
                                    <div className='exercise-input'>
                                        <span>{index + 1}</span>

                                        <input
                                            type="number"
                                            value={set.weight}
                                            placeholder='0'
                                            onChange={(e) => updateSetWeight(exercise, index, e.target.value)}
                                        />

                                        <input
                                            type="number"
                                            value={set.reps}
                                            placeholder='0'
                                            onChange={(e) => updateSetReps(exercise, index, e.target.value)}
                                        />

                                        <input
                                            type="checkbox"
                                            checked={set.completed}
                                            onChange={(e) => updateSetCompleted(exercise, index, e.target.checked)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='add-set-btn'
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
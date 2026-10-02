import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const WorkoutPage = ({ user }) => {

    const [workout, setWorkout] = useState(null)
    const [selectedSet, setSelectedSet] = useState(null)
    const [previousExercises, setPreviousExercises] = useState({})



    const { id } = useParams()

    console.log("PREVIOUS EXERCISES:", previousExercises)

    const getPreviousExercise = async (exerciseId) => {
        const response = await fetch(`http://localhost:5000/api/workouts/previous/${exerciseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
        })
        const data = await response.json()

        setPreviousExercises((current) => {
            return {
                ...current, [exerciseId]: data
            }
        })
    }



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

                data.workoutExercises.forEach((exercise) => {
                    getPreviousExercise(exercise.exerciseId)
                })


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

    const deleteSet = async (exercise, setIndex) => {
        const updatedExercises = workout.workoutExercises.map((currentExercise) => {
            if (exercise._id === currentExercise._id) {
                const updatedSets = currentExercise.sets.filter((currentSet, index) => {
                    return index !== setIndex
                })
                return {
                    ...currentExercise,
                    sets: updatedSets
                }
            } return currentExercise

        })
        setWorkout({ ...workout, workoutExercises: updatedExercises })
        saveWorkout(updatedExercises)
    }

    const finishWorkout = async () => {
        const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                completedAt: new Date()
            })
        })
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
                                        <div className='set-number-container'>
                                            <button
                                                type='button'
                                                onClick={() => setSelectedSet(
                                                    selectedSet &&
                                                        selectedSet.exerciseId === exercise._id &&
                                                        selectedSet.setIndex === index
                                                        ? null
                                                        : {
                                                            exerciseId: exercise._id,
                                                            setIndex: index
                                                        }
                                                )}
                                            >
                                                {index + 1}
                                            </button>

                                        </div>

                                        <input
                                            type="number"
                                            value={set.weight ?? ""}
                                            placeholder='0'
                                            onChange={(e) => updateSetWeight(exercise, index, e.target.value)}
                                        />

                                        <input
                                            type="number"
                                            value={set.reps ?? ""}
                                            placeholder='0'
                                            onChange={(e) => updateSetReps(exercise, index, e.target.value)}
                                        />

                                        <input
                                            type="checkbox"
                                            checked={set.completed}
                                            onChange={(e) => updateSetCompleted(exercise, index, e.target.checked)}
                                        />
                                    </div>
                                    {selectedSet &&
                                        selectedSet.exerciseId === exercise._id &&
                                        selectedSet.setIndex === index &&
                                        (
                                            <button
                                                type='button'
                                                className='delete-set-btn'
                                                onClick={() => deleteSet(exercise, index)}
                                            >
                                                Delete Set {index + 1}
                                            </button>
                                        )}
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

                <button
                    type='button'
                    onClick={finishWorkout}
                >
                    Finish Workout
                </button>
            </div>
        </div>
    )
}

export default WorkoutPage
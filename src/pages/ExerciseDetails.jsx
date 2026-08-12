import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

const ExererciseDetails = () => {

    const [exercise, setExercise] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { id } = useParams()

    const imageBaseUrl = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"

    useEffect(() => {



        const fetchExercise = async () => {
            setLoading(true)
            setError("")

            try {
                const response = await fetch(`https://api.exerciseapi.dev/v1/exercises/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "X-API-Key": import.meta.env.VITE_API_KEY
                        }
                    }
                )
                if (!response.ok) {
                    throw new Error("Failed to load exercise details..")
                }


                const data = await response.json()

                console.log(data)

                setExercise(data.data)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }



        }

        fetchExercise()

    }, [id])

    return (
        <div className='details-container'>
            <h1>Exercise Details</h1>
            {loading && <p>Loading Details..</p>}
            {error && <p>{error}</p>}

            {exercise && (
                <div>
                    <h2>{exercise.name}</h2>
                    <div className='badge-container details-badges'>
                        <span>{exercise.level}</span>
                        <span>{exercise.equipment}</span>
                    </div>
                    <img
                        className='details-img'
                        src={imageBaseUrl + exercise?.images[0]}
                        alt="Exercise Demo Image" />

                    <div className='overview-container'>
                        <h3>Overview:</h3>
                        <p>{exercise.overview}</p>
                    </div>
                    <div className='pm-container'>
                        <h3>Primary Muscles:</h3>
                        <ul>
                            {exercise.primaryMuscles.map((muscle, index) => (
                                <li key={index}>{muscle}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='sm-container'>
                        <h3>Secondary Muscles:</h3>
                        <ul>
                            {exercise.secondaryMuscles.map((muscle, index) => (
                                <li key={index}>{muscle}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='instruction-container'>
                        <h3>Instructions:</h3>
                        <ol>
                            {exercise.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                    <div className='safety-container'>
                        <h3>Safety Info:</h3>
                        <p>{exercise.safetyInfo}</p>
                    </div>

                </div>
            )}


        </div>
    )
}

export default ExererciseDetails
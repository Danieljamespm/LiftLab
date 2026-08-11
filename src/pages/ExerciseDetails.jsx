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
        <div>
            <h1>Exercise Details</h1>
            {loading && <p>Loading Details..</p>}
            {error && <p>{error}</p>}

            <div>
                <h2>{exercise?.name}</h2>
                <img src={imageBaseUrl + exercise?.images[1]} alt="Exercise Demo Image" />
                <p>Equipment: {exercise?.equipment}</p>
                <p>Primary Muscles: {exercise?.primaryMuscles[0]}</p> <p>{exercise?.primaryMuscles[1]}</p>
                <p>Overview: {exercise?.overview}</p>
            </div>

        </div>
    )
}

export default ExererciseDetails
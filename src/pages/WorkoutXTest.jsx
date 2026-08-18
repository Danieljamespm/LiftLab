import { useEffect, useState } from "react"

function WorkoutXTest() {
    const [exercises, setExercises] = useState([])
    const [gifUrl, setGifUrl] = useState("")

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`https://api.workoutxapp.com/v1/exercises/name/crossovers`,
                    {

                        headers: {
                            "X-WorkoutX-Key": import.meta.env.VITE_WORKOUT_API_KEY
                        }
                    }
                )

                const data = await response.json()
                console.log(data)
                setExercises(data.data)
                const firstExercise = data.data[1]
                const gifResponse = await fetch(firstExercise.gifUrl, {
                    headers: {
                        "X-WorkoutX-Key": import.meta.env.VITE_WORKOUT_API_KEY
                    }
                })

                const gifBlob = await gifResponse.blob()
                const gifObjectUrl = URL.createObjectURL(gifBlob)

                setGifUrl(gifObjectUrl)
            } catch (error) {
                console.error(error)
            }
        }

        fetchExercises()
    }, [])

    return (
        <div>
            <h1>WorkoutX API Test</h1>
            {gifUrl && <img src={gifUrl} alt="Exercise demo" />}
            {exercises.map((exercise) => (
                <div key={exercise.id}>
                    <p>{exercise.name}</p>
                    <img src={exercise.gifUrl} alt="" />
                </div>
            ))}

        </div>
    )
}

export default WorkoutXTest
import { Link } from "react-router"
import { useState } from "react"
import ExerciseCard from "../components/ExerciseCard"




const BuildRoutine = () => {

    const [searchText, setSearchText] = useState('')
    const [exercises, setExercises] = useState([])
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleMediaError = (badId) => {
        setExercises((currentExercises) =>
            currentExercises.filter(
                (exercise) => exercise.exerciseId !== badId
            )
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        const params = new URLSearchParams()



        if (searchText) {
            params.append("name", searchText)
        }

        if (bodyPart) {
            params.append("bodyParts", bodyPart)
        }

        if (equipment) {
            params.append("equipments", equipment)
        }

        params.append("limit", "15")



        const url = `https://oss.exercisedb.dev/api/v1/exercises?${params.toString()}`


        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const data = await response.json();

            console.log(data)
            setExercises(data.data)
            if (data.length === 0) {
                throw new Error("No exercises found.");
            }


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }



    return (

        <>
            <div>BuildRoutine</div>

            <Link to={"/"}>
                Back to Home
            </Link>

            <form onSubmit={handleSubmit}>
                <input className="search-params"
                    type="text"
                    value={searchText}
                    placeholder="Search Exercise"
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select className="search-params"
                    value={bodyPart}
                    onChange={(e) => setBodyPart(e.target.value)}
                >
                    <option value="">All Muscles</option>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="upper arms">Arms</option>
                    <option value="upper legs">Upper Legs</option>
                    <option value="lower legs">Lower Legs</option>
                    <option value="waist">Core</option>

                </select>

                <select className="search-params"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <option value="">All equipment</option>
                    <option value="barbell">Barbell</option>
                    <option value="dumbbell">Dumbbell</option>
                    <option value="cable">Cable</option>
                    <option value="kettlebell">Kettlebell</option>
                    <option value="resistance band">Resistance Band</option>
                </select>

                <button className="search-btn"
                    disabled={loading}>
                    {loading ? "Searching" : "Search"}
                </button>

            </form>

            {loading && <p>Loading exercises...</p>}
            {error && <p>{error}</p>}

            <div className="exercise-list">

                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.exerciseId}
                        exercise={exercise}
                        onMediaError={handleMediaError}

                    />
                ))}
            </div>
        </>
    )
}

export default BuildRoutine
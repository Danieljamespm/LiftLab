import { Link } from "react-router"
import { useState } from "react"
import ExerciseCard from "../components/ExerciseCard"




const BuildRoutine = () => {

    const [searchText, setSearchText] = useState('')
    const [exercises, setExercises] = useState([])
    const [muscle, setMuscle] = useState('')
    const [equipment, setEquipment] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        const params = new URLSearchParams()

        if (searchText) {
            params.append("q", searchText)
        }

        if (muscle) {
            params.append("muscle", muscle)
        }

        if (equipment) {
            params.append("equipment", equipment)
        }

        params.append("limit", "10")

        const url = `https://api.exerciseapi.dev/v1/exercises?${params.toString()}`
        const options = {
            method: "GET",
            headers: {
                "X-API-Key": import.meta.env.VITE_API_KEY,

            }
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const data = await response.json();

            console.log(data)

            if (data.length === 0) {
                throw new Error("No exercises found.");
            }

            setExercises(data.data);
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
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                >
                    <option value="">All Muscles</option>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                </select>

                <select className="search-params"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <option value="">All equipment</option>
                    <option value="barbell">Barbell</option>
                    <option value='dumbbell'>Dumbbell</option>
                </select>

                <button className="search-btn"
                    disabled={loading}>
                    {loading ? "Searching" : "Search"}
                </button>

            </form>

            {loading && <p>Loading exercises...</p>}
            {error && <p>{error}</p>}

            <div className="exercise-list">

                {exercises
                    .filter((exercise) => exercise.images && exercise.images.length > 0)
                    .map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                        />
                    ))}
            </div>
        </>
    )
}

export default BuildRoutine
import { Link } from "react-router"
import { useState } from "react"




const BuildRoutine = () => {

    const [searchText, setSearchText] = useState('')
    const [exercises, setExercises] = useState([])
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises?name=${encodeURIComponent(searchText)}&bodyParts=${encodeURIComponent(bodyPart)}&equipments=${encodeURIComponent(equipment)}&limit=100`
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                "x-rapidapi-host":
                    "edb-with-videos-and-images-by-ascendapi.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const data = await response.json();

            if (data.data.length === 0) {
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
                <input type="text"
                    value={searchText}
                    placeholder="Search Exercise"
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                    value={bodyPart}
                    onChange={(e) => setBodyPart(e.target.value)}
                >
                    <option value="">All Muscles</option>
                    <option value="CHEST">Chest</option>
                    <option value="BACK">Back</option>
                </select>

                <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <option value="">All equipment</option>
                    <option value="BARBELL">Barbell</option>
                    <option value='DUMBBELL'>Dumbbell</option>
                </select>

                <button disabled={loading}>
                    {loading ? "Searching" : "Search"}
                </button>

            </form>

            {loading && <p>Loading exercises...</p>}
            {error && <p>{error}</p>}

            <div>
                {exercises.map((exercise) => (
                    <div key={exercise.exerciseId}>
                        <h3>{exercise.name}</h3>
                        <img src={exercise.imageUrl} alt='Exercise reference image' />
                    </div>
                ))}
            </div>
        </>
    )
}

export default BuildRoutine
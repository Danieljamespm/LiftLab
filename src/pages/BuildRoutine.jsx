import { Link } from "react-router"
import { useState } from "react"
import ExerciseCard from "../components/ExerciseCard"
import Toast from "../components/Toast"




const BuildRoutine = ({ routineExercises, setRoutineExercises, routineName, setRoutineName }) => {

    const [searchText, setSearchText] = useState('')
    const [exercises, setExercises] = useState([])
    const [toastMessage, setToastMessage] = useState("")
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

    const handleAddExercise = (exercise) => {
        if (routineExercises.includes(exercise.exerciseId)) {
            return
        }
        setRoutineExercises([...routineExercises, exercise])

        setToastMessage(`${exercise.name} successfully added to ${routineName}.`)

        setTimeout(() => setToastMessage(""), 2000)

    }



    const getSearchHint = (searchText) => {
        const search = searchText.toLowerCase().trim()

        const commonSearchTerms = {
            "push up": "chest",
            "push-up": "chest",
            "pushup": "chest",
            "bench press": "chest",
            "lateral raise": "shoulders",
            "lat raise": "shoulders",
            "bicep curl": "upper arms",
            "curl": "upper arms",
        }

        return commonSearchTerms[search]
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        const params = new URLSearchParams()



        if (searchText) {
            params.append("name", searchText)
        }

        const searchHint = getSearchHint(searchText)

        if (bodyPart) {
            params.append("bodyParts", bodyPart)
        } else if (searchHint) {
            params.append("bodyParts", searchHint)
        }

        if (equipment) {
            params.append("equipments", equipment)
        }

        params.append("limit", "25")



        const url = `https://oss.exercisedb.dev/api/v1/exercises?${params.toString()}`


        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const data = await response.json();

            console.log(data)
            const normalizeText = (text) => {
                return text
                    .toLowerCase()
                    .replaceAll("-", " ")
                    .replaceAll("cross over", "crossover")
                    .trim()
            }

            const normalizedSearch = normalizeText(searchText)

            const filteredExercises = data.data.filter((exercise) => {
                const exerciseName = normalizeText(exercise.name)

                return exerciseName.includes(normalizedSearch)
            })

            const commonExercises = [
                "squat",
                "dumbbell squat",
                "barbell full squat",
                "deadlift",
                "barbell deadlift",
                "dumbbell deadlift",
                "bench press",
                "push up",
                "lateral raise",
                "dumbbell standing biceps curl",
                "barbell curl",
                "cable crossover",
            ]

            const rankedExercises = [...filteredExercises].sort((a, b) => {
                const nameA = normalizeText(a.name)
                const nameB = normalizeText(b.name)
                const aIsCommon = commonExercises.includes(nameA)
                const bIsCommon = commonExercises.includes(nameB)

                if (nameA === normalizedSearch && nameB !== normalizedSearch) {
                    return -1
                }

                if (nameB === normalizedSearch && nameA !== normalizedSearch) {
                    return 1
                }

                if (aIsCommon && !bIsCommon) {
                    return -1
                }

                if (bIsCommon && !aIsCommon) {
                    return 1
                }

                if (nameA.startsWith(normalizedSearch) && !nameB.startsWith(normalizedSearch)) {
                    return -1
                }

                if (nameB.startsWith(normalizedSearch) && !nameA.startsWith(normalizedSearch)) {
                    return 1
                }

                return 0
            })

            setExercises(rankedExercises)
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
            <h1>BuildRoutine</h1>

            <Link to={"/"} className="link-btn">
                Back to Home
            </Link>
            <Link to={"/routines"} className="link-btn">
                View Routines
            </Link>

            <input type="text"
                className="routine-name"
                placeholder="Routine Name"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
            />

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
            {toastMessage && <Toast message={toastMessage} />}

            <div className="exercise-list">

                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.exerciseId}
                        exercise={exercise}
                        onMediaError={handleMediaError}
                        onAddExercise={handleAddExercise}

                    />
                ))}
            </div>
        </>
    )
}

export default BuildRoutine
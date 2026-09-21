import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import StartButton from "../components/StartWorkoutButton"

const HomePage = ({ savedRoutines, setUser, user }) => {


    const [expandedRoutine, setExpandedRoutine] = useState("")

    console.log(expandedRoutine)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (

        <>
            <div className="back-btn-container">
                <button className="back-btn"
                    onClick={handleLogout}
                >
                    Logout</button>
            </div>
            <h1>HomePage</h1>

            <Link to={"/build-routine"} className="link-btn">
                Build Routine
            </Link>

            <div>
                {savedRoutines.map((routine) => (
                    <div key={routine._id} className='manage-routine '>
                        <h2>{routine.routineName}</h2>
                        <p onClick={() => setExpandedRoutine(expandedRoutine === routine.routineName ? "" : routine.routineName)}
                            className="dropdown"
                        >
                            {routine.routineExercises.length} Exercises
                            <span className="drop-arrow">{expandedRoutine === routine.routineName ? <ChevronDown /> : <ChevronRight />}</span>
                        </p>

                        {expandedRoutine === routine.routineName && (
                            <div className="exercise-list">
                                {routine.routineExercises.map((exercise) => (
                                    <div key={exercise.exerciseId} className="exercise-card">

                                        <div className="exercise-thumbnail">
                                            <img src={exercise.gifUrl} />
                                        </div>

                                        <div className="exercise-info">
                                            <h3>{exercise.name}</h3>

                                            <div className="badge-container">
                                                <span>{exercise.equipments}</span>
                                                <span>{exercise.bodyParts}</span>
                                            </div>

                                        </div>



                                        <button className="details-btn"
                                            onClick={() => navigate(`/exercise/${exercise.exerciseId}`)}
                                        >
                                            i
                                        </button>
                                    </div>
                                ))}
                                <StartButton
                                    user={user}
                                    routine={routine}
                                />

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage
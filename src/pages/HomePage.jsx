import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const HomePage = ({ savedRoutines, setUser }) => {


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
                {savedRoutines.map((routines) => (
                    <div className='manage-routine '>
                        <h2>{routines.routineName}</h2>
                        <p onClick={() => setExpandedRoutine(expandedRoutine === routines.routineName ? "" : routines.routineName)}
                            className="dropdown"
                        >
                            {routines.routineExercises.length} Exercises
                            <span className="drop-arrow">{expandedRoutine === routines.routineName ? <ChevronDown /> : <ChevronRight />}</span>
                        </p>

                        {expandedRoutine === routines.routineName && (
                            <div className="exercise-list">
                                {routines.routineExercises.map((exercise) => (
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
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage
import React from 'react'
import { Link, useNavigate } from 'react-router'


const ManageRoutines = ({ routineExercises, routineName, savedRoutines, setSavedRoutines, setRoutineExercises, setRoutineName }) => {

    const navigate = useNavigate()


    const handleSavedRoutines = () => {
        setSavedRoutines([...savedRoutines, { routineName, routineExercises }])

        setRoutineExercises([])
        setRoutineName("")
    }

    console.log(savedRoutines)

    return (
        <div>
            <h1>ManageRoutines</h1>

            <Link to={"/build-routine"}>
                Back to Build Routine
            </Link>

            <div>
                <div className='routine'>
                    <h2>{routineName}</h2>
                    {routineExercises.map((exercise) => (
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

                    <button onClick={handleSavedRoutines}>
                        Save Routine
                    </button>
                </div>

                <div>
                    {savedRoutines.map((routines) => (
                        <div className='manage-routine '>
                            <h2>{routines.routineName}</h2>

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
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ManageRoutines
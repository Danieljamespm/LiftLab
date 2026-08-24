import React from 'react'
import { Link, useNavigate } from 'react-router'


const ManageRoutines = ({ routineExercises, routineName }) => {

    const navigate = useNavigate()
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
                </div>
            </div>

        </div>
    )
}

export default ManageRoutines
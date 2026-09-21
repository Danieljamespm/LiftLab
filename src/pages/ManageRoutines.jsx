import React from 'react'
import { Link, useNavigate } from 'react-router'


const ManageRoutines = ({ routineExercises, routineName, savedRoutines, setSavedRoutines, setRoutineExercises, setRoutineName, user }) => {

    const navigate = useNavigate()


    const handleSavedRoutines = async () => {
        const response = await fetch('http://localhost:5000/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${user.token}`
            },

            body: JSON.stringify({
                routineName,
                routineExercises
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.log(data.message)
            return
        }

        setSavedRoutines([...savedRoutines, data])

        setRoutineExercises([])
        setRoutineName("")
    }

    console.log(savedRoutines)

    return (
        <div>
            <h1>ManageRoutines</h1>

            <Link to={"/build-routine"} className='link-btn'>
                Back to Build Routine
            </Link>

            <div>
                <div className='routine'>
                    <h2>{routineName}</h2>
                    <div className='exercise-list'>
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


                        <button className='save-btn'

                            onClick={handleSavedRoutines}>
                            Save Routine
                        </button>
                    </div>
                </div>
                <div>
                    {savedRoutines.map((routines) => (
                        <div className='manage-routine ' key={routines.routineName}>
                            <h2>{routines.routineName}</h2>
                            <div className='exercise-list'>
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
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ManageRoutines
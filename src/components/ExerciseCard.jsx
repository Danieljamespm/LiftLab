import React from 'react'
import { useNavigate } from 'react-router'

const ExerciseCard = ({ exercise, onMediaError }) => {



    const navigate = useNavigate()

    return (

        <div className="exercise-card">
            <div className="exercise-thumbnail">
                <img src={exercise.gifUrl} onError={() => onMediaError(exercise.exerciseId)} />
            </div>

            <div className="exercise-info">
                <h3>{exercise.name}</h3>

                <div className="badge-container">
                    <span>{exercise.equipments}</span>
                    <span>{exercise.bodyParts}</span>
                </div>
            </div>

            <button className="details-btn"
                onClick={() => navigate(`/exercise/${exercise.id}`)}
            >
                i
            </button>
        </div>

    )
}

export default ExerciseCard
import React from 'react'

const ExerciseCard = ({ exercise }) => {

    const video = exercise.videos?.[0]?.url

    return (

        <div className="exercise-card">
            <div className="exercise-thumbnail">
                <p>No Preview</p>
            </div>

            <div className="exercise-info">
                <h3>{exercise.name}</h3>

                <div className="badge-container">
                    <span>{exercise.equipment}</span>
                    <span>{exercise.level}</span>
                </div>
            </div>

            <button className="details-btn">
                i
            </button>
        </div>

    )
}

export default ExerciseCard
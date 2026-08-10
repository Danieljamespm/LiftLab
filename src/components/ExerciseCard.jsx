import React from 'react'

const ExerciseCard = ({ exercise }) => {

    const imageBaseUrl = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"

    return (

        <div className="exercise-card">
            <div className="exercise-thumbnail">
                <img src={imageBaseUrl + exercise.images[0]} alt="No Preview" />
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
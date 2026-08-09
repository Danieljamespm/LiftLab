import React from 'react'

const ExerciseCard = ({ exercise }) => {

    const video = exercise.videos?.[0]?.url

    return (

        <div className='exercise-card'>

            <div className='media-container'>
                {video ? (
                    <video
                        src={video}
                        controls
                        width="320"
                    />
                ) : (
                    <div className='media-placeholder'>No Preview Available</div>
                )}
            </div>

            <h3>{exercise.name}</h3>

            <div className='badge-container'>
                <span>{exercise.equipment}</span>
                <span>{exercise.level}</span>
            </div>

            <div className='btn-container'>
                <button>View Details</button>
                <button>+ Add To Routine</button>
            </div>

        </div>

    )
}

export default ExerciseCard
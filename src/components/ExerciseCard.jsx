import React from 'react'

const ExerciseCard = ({ exercise }) => {

    const video = exercise.videos?.[0]?.url

    return (
        <div>
            <div key={exercise.id}>
                {video && <video
                    src={video}
                    controls
                    width="320"
                >
                </video>}
                <h3>{exercise.name}</h3>
                <span>{exercise.equipment}</span>
                <span>{exercise.level}</span>
                <button>View Details</button>
                <button>+ Add To Routine</button>

            </div>
        </div>
    )
}

export default ExerciseCard
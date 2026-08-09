import React from 'react'

const ExerciseCard = ({ exercise }) => {
    return (
        <div>
            <div key={exercise.id}>
                <h3>{exercise.name}</h3>
                <video
                    src={exercise.videos?.[0]?.url}
                    controls
                    width="320"
                ></video>
            </div>
        </div>
    )
}

export default ExerciseCard
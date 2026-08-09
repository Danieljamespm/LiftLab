import React from 'react'

const ExerciseCard = ({ exercise }) => {

    const video = exercise.videos?.[0]?.url

    return (
        <div>
            <div key={exercise.id}>

                <div>
                    {video ? (
                        <video
                            src={video}
                            controls
                            width="320"
                        />
                    ) : (
                        <div>No Preview Available</div>
                    )}
                </div>

                <h3>{exercise.name}</h3>

                <div>
                    <span>{exercise.equipment}</span>
                    <span>{exercise.level}</span>
                </div>

                <div>
                    <button>View Details</button>
                    <button>+ Add To Routine</button>
                </div>

            </div>
        </div>
    )
}

export default ExerciseCard
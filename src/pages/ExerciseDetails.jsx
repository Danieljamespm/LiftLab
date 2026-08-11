import React from 'react'
import { useParams } from 'react-router'

const ExererciseDetails = () => {

    const { id } = useParams()

    return (
        <div>
            <h1>Exercise Details</h1>
            <p>{id}</p>

        </div>
    )
}

export default ExererciseDetails
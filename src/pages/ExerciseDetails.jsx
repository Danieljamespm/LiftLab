import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

const ExererciseDetails = () => {

    const [exercise, setExercise] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { id } = useParams()

    return (
        <div>
            <h1>Exercise Details</h1>
            <p>{id}</p>

        </div>
    )
}

export default ExererciseDetails
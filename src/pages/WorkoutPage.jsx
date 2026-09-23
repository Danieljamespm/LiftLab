import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const WorkoutPage = ({ user }) => {

    const [workout, setWorkout] = useState(null)

    const { id } = useParams()


    useEffect(() => {
        const fetchWorkout = async () => {

            try {
                const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                })

                const data = await response.json()

                if (!response.ok) {
                    console.log(data.message)
                    return
                }

                setWorkout(data)


            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkout()
    }, [id, user])




    return (
        <div>
            <h1>Workout Page</h1>
        </div>
    )
}

export default WorkoutPage
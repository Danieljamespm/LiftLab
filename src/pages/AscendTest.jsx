import React, { useState, useEffect } from 'react'


const AscendTest = () => {

  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchExercises = async () => {

      try {
        const response = await fetch(`https://oss.exercisedb.dev/api/v1/exercises/search?search=bench%20press`)
        const data = await response.json()
        console.log(data)

        setExercises(data.data)
      } catch (error) {

      }

    }
    fetchExercises()
  }, [])



  return (
    <div>
      <h1>Ascend Test</h1>

      {exercises.map((exercise) => (
        <div key={exercise.exerciseId}>
          <h2>{exercise.name}</h2>
          <img src={exercise.gifUrl} alt="" />
        </div>
      ))}

    </div>
  )
}

export default AscendTest




import { useState } from 'react'

import './App.css'

function App() {

  const [searchText, setSearchText] = useState("")
  const [exercises, setExercises] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/search?search=${encodeURIComponent(searchText)}`
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json()
      console.log(data)
      if (data.data.length === 0) {
        throw new Error("No exercise found.")
      }

      setExercises(data.data)
      setSearchText("")

    } catch (error) {
      setError(error.message)
      console.log(error)
      setExercises([])
    } finally {
      setLoading(false)
    }
  }



  return (
    <main>
      <h1>Lift Lab</h1>

      <section>
        <form onSubmit={handleSubmit}>

          <input type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search for an exercise'
          />

          <button type='Submit'>Search</button>

        </form>
      </section>
      <section>
        {exercises.map((exercise) => (
          <div key={exercise.exerciseId}>
            <h2>{exercise.name}</h2>
            <img src={exercise.imageUrl} alt="Exercise GIF" />
          </div>
        ))}
      </section>
    </main>
  )

}

export default App

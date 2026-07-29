import { useState } from 'react'

import './App.css'

function App() {

  const [searchText, setSearchText] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log(searchText)

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
    </main>
  )

}

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import BuildRoutine from './pages/BuildRoutine'
import ExerciseDetails from './pages/ExerciseDetails'
import AscendTest from './pages/AscendTest'
import WorkoutXTest from './pages/WorkoutXTest'
import ManageRoutines from './pages/ManageRoutines'
import Login from './pages/Login'
import SplashScreen from './components/SplashScreen'

function App() {


  const [showSplash, setShowSplash] = useState(true)
  const [splashFade, setSplashFade] = useState(false)
  const [routineExercises, setRoutineExercises] = useState([])
  const [routineName, setRoutineName] = useState("")
  const [savedRoutines, setSavedRoutines] = useState(JSON.parse(localStorage.getItem("savedRoutines")) || [])
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )

  // SPLASH SCREEN 

  useEffect(() => {
    setTimeout(() => {
      setSplashFade(true)
    }, 1900)

    setTimeout(() => {
      setShowSplash(false)
    }, 2200)
  }, [])


  // USER ROUTINE FETCH

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchRoutines = async () => {
      const response = await fetch('http://localhost:5000/api/routines', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },

      })
      const data = await response.json()

      setSavedRoutines(data)
    }

    fetchRoutines()

  }, [user])


  useEffect(() => {
    localStorage.setItem("savedRoutines", JSON.stringify(savedRoutines))
  }, [savedRoutines])


  console.log(user)

  if (showSplash) {
    return <SplashScreen
      splashFade={splashFade}
    />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user ?
            <HomePage
              setUser={setUser}
              savedRoutines={savedRoutines}
            />
            :
            <Navigate to="/login" />
        } />

        <Route path='/build-routine' element={<BuildRoutine
          routineExercises={routineExercises}
          setRoutineExercises={setRoutineExercises}
          routineName={routineName}
          setRoutineName={setRoutineName} />} />
        <Route path='/exercise/:id' element={<ExerciseDetails />} />
        <Route path='/ascend-test' element={<AscendTest />} />
        <Route path='/workoutx-test' element={<WorkoutXTest />} />
        <Route path='/routines' element={<ManageRoutines
          user={user}
          routineExercises={routineExercises}
          routineName={routineName}
          savedRoutines={savedRoutines}
          setSavedRoutines={setSavedRoutines}
          setRoutineExercises={setRoutineExercises}
          setRoutineName={setRoutineName} />}
        />
        <Route path='/login' element={
          user ?
            <Navigate to="/" />
            :
            <Login
              setUser={setUser}
            />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App

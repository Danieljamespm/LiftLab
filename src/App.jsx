import { BrowserRouter, Routes, Route } from 'react-router'
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import BuildRoutine from './pages/BuildRoutine'
import ExerciseDetails from './pages/ExerciseDetails'
import AscendTest from './pages/AscendTest'
import WorkoutXTest from './pages/WorkoutXTest'
import ManageRoutines from './pages/ManageRoutines'

function App() {

  const [routineExercises, setRoutineExercises] = useState([])
  const [routineName, setRoutineName] = useState("")
  const [savedRoutines, setSavedRoutines] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/build-routine' element={<BuildRoutine
          routineExercises={routineExercises}
          setRoutineExercises={setRoutineExercises}
          routineName={routineName}
          setRoutineName={setRoutineName} />} />
        <Route path='/exercise/:id' element={<ExerciseDetails />} />
        <Route path='/ascend-test' element={<AscendTest />} />
        <Route path='/workoutx-test' element={<WorkoutXTest />} />
        <Route path='/routines' element={<ManageRoutines
          routineExercises={routineExercises}
          routineName={routineName}
          savedRoutines={savedRoutines}
          setSavedRoutines={setSavedRoutines}
          setRoutineExercises={setRoutineExercises}
          setRoutineName={setRoutineName} />}
        />
      </Routes>
    </BrowserRouter>
  )

}

export default App

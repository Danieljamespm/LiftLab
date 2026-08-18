import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import HomePage from './pages/HomePage'
import BuildRoutine from './pages/BuildRoutine'
import ExerciseDetails from './pages/ExerciseDetails'
import AscendTest from './pages/AscendTest'
import WorkoutXTest from './pages/WorkoutXTest'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/build-routine' element={<BuildRoutine />} />
        <Route path='/exercise/:id' element={<ExerciseDetails />} />
        <Route path='/ascend-test' element={<AscendTest />} />
        <Route path='/workoutx-test' element={<WorkoutXTest />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App

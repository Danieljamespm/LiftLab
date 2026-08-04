import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import HomePage from './pages/HomePage'
import BuildRoutine from './pages/BuildRoutine'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/build-routine' element={<BuildRoutine />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App

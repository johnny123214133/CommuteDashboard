import { useState } from 'react'
import reactLogo from '../assets/react.svg'
// import viteLogo from '../vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import NavBar from '../components/NavBar/NavBar.jsx'
import Dashboard from '../components/Dashboard/Dashboard.jsx'

import CommuteDataContext from '../components/contexts/CommuteDataContext/CommuteDataContext.jsx'

function App() {
  return (
    <>
      <CommuteDataContext Children={Dashboard}/>
    </>
  )
}

export default App

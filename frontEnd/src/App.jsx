
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import Register from './pages/Register'


function App() {
 
  return (
      <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='Register' element={<Register/>}/>
            <Route path="Login" element={<Login/>}/>           
          </Route>
      </Routes>
      </>
  )
}

export default App

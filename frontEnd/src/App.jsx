
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './protectRoutes'

function App() {
 
  return (
      <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='Register' element={<Register/>}/>
            <Route path="Login" element={<Login/>}/>                 
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Dashboard' element={<Dashboard/>}/> 
          </Route>
            
      </Routes>
      </>
  )
}

export default App

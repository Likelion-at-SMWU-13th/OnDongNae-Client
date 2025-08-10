import './App.css'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Login />
      <Outlet />
    </>
  )
}

export default App

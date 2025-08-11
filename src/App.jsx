import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App

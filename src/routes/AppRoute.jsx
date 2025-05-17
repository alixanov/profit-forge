import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../components/Main'
import Start from '../components/Start'
import Create from '../components/Create'

const AppRoutes = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/main' element={<Main />} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </div>
  )
}

export default AppRoutes

import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './services/api'
import {useDispatch, useSelector} from 'react-redux'

export const serverUrl ="http://localhost:8000" 

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])

  const {userData} = useSelector((state)=>state.user)
  console.log(userData)
  

  return (
    <>
      <Routes>
        <Route path="/" element={userData ?  <Home /> : <Navigate to="/auth" replace /> } />
        <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Auth/>} />
      </Routes>
    </>
  )
}

export default App
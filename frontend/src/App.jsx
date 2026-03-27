import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './services/api'
import { useDispatch, useSelector } from 'react-redux'
import History from './pages/History'
import Notes from './pages/Notes'
import Pricing from './pages/Pricing'
import PaymentFailed from './pages/PaymentFailed'
import PaymentSuccess from './pages/PaymentSucces'

export const serverUrl = "https://examnotesaiserverr.onrender.com"

// ✅ Beautiful Loading Component
const LoadingScreen = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* Triple Ring Spinner */}
      <div style={{ position: "relative", width: "100px", height: "100px" }}>

        {/* Ring 1 — slowest */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#3b82f6",
          borderRightColor: "#3b82f6",
          animation: "spin1 1.8s linear infinite",
        }} />

        {/* Ring 2 — counter clockwise */}
        <div style={{
          position: "absolute", inset: "12px",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#60a5fa",
          borderLeftColor: "#60a5fa",
          animation: "spin2 1.2s linear infinite",
        }} />

        {/* Ring 3 — fastest */}
        <div style={{
          position: "absolute", inset: "24px",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderBottomColor: "#93c5fd",
          animation: "spin1 0.8s linear infinite",
        }} />

        {/* Center Glowing Dot */}
        <div style={{
          position: "absolute", inset: "38px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #60a5fa, #3b82f6)",
          boxShadow: "0 0 20px rgba(59,130,246,0.8)",
          animation: "pulse 1.5s ease-in-out infinite",
        }} />
      </div>

      {/* App Name */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: "700",
          background: "linear-gradient(90deg, #fff, #93c5fd, #fff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.5px",
          margin: 0,
        }}>
          ExamNotes AI
        </h1>
        <p style={{
          color: "#64748b",
          fontSize: "13px",
          marginTop: "6px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          Loading your workspace...
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div style={{
        width: "180px",
        height: "3px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "999px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)",
          borderRadius: "999px",
          animation: "progress 1.8s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes spin1 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin2 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes progress {
          0%   { width: 0%;  margin-left: 0%; }
          50%  { width: 70%; margin-left: 15%; }
          100% { width: 0%;  margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser(dispatch).finally(() => setLoading(false))
  }, [dispatch])

  const { userData } = useSelector((state) => state.user)

  if (loading) return <LoadingScreen />

  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Auth />} />
        <Route path='/history' element={userData ? <History /> : <Navigate to="/auth" replace />} />
        <Route path='/notes' element={userData ? <Notes /> : <Navigate to="/auth" replace />} />
        <Route path='/pricing' element={userData ? <Pricing /> : <Navigate to="/auth" replace />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-failed' element={<PaymentFailed />} />
      </Routes>
    </>
  )
}

export default App
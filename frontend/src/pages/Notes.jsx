import React, { use } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Notes = () => {

  const navigate = useNavigate()
  const {userData} = useSelector((state)=>state.user)
  const credits = userData.credits


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8'>

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className='mb-10 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900
      backdrop-blur-xl  border border-blue-400/30 px-8 py-6 
        shadow-[0_10px_30px_rgba(30,64,175,0.35)] items-start flex md:items-center justify-between gap-4 flex-col md:flex-row'>

        <div
          onClick={() => navigate("/")}
          className='cursor-pointer'>
          <h1 className='text-xl sm:text-2xl font-bold 
        bg-gradient-to-r from-white via-gray-300 to-white 
        bg-clip-text text-transparent'>
            ExamNotes AI
          </h1>
          <p className='text-xs sm:text-sm text-gray-300 mt-1'>
            AI-Powered exam-oriented notes & revision
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <button 
          onClick={()=>navigate("/pricing")}
          className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm'>
            <span className="text-xl">🔷</span>
            <span>{credits}</span>

            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold"
            >
              ➕
            </motion.span>

          </button>

          <button></button>
        </div>

      </motion.header>
    </div>
  )
}

export default Notes
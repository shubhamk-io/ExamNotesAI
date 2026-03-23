import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";

const History = () => {

  const [topic, setTopic] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState (false)
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits

  useEffect(() => {

    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        console.log("Full response:", res.data)            // { success: true, notes: [...] }
        console.log("Notes array:", res.data.notes)

        setTopic(Array.isArray(res.data.notes) ? res.data.notes : [])

        console.log(topic)
      } catch (error) {
        console.log(error)
      }

    }
    myNotes()
  }, [])


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 px-6 py-8 '>

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-2xl 
  bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900
  backdrop-blur-xl
  border border-blue-400/30
  shadow-[0_10px_30px_rgba(30,64,175,0.35)]
  px-8 py-6 items-start flex justify-between md:items-center gap-4 flex-wrap"
      >

        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1
            className="text-xl sm:text-2xl font-bold 
      bg-gradient-to-r from-white via-gray-300 to-white 
      bg-clip-text text-transparent"
          >
            ExamNotes AI
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            AI-Powered exam-oriented notes & revision
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">

          <button
          onClick={()=>setIsSidebarOpen(true)}
          className=' lg:hidden text-white text-2xl '>{<GiHamburgerMenu />
          }</button>

          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
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


        </div>

      </motion.header>


      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && <motion.div
            initial={{ opacity: 0, x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className='fixed lg:static top-0 left-0 z-5- lg:z-auto w-72 lg:w-auto h-full lg:h-[75vh] lg:col-span-1 bg-black/90 lg:bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_45_px_rgba(0,0,0,0.6)] p-5 overflow-y-auto '
          >

          </motion.div>}
        </AnimatePresence>

      </div>

    </div >
  )
}

export default History
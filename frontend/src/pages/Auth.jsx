import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import {  signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/fireBase.js';
import axios from 'axios'
import { serverUrl } from '../App.jsx';

const Auth = () => {

const handleGoogleAuth = async () => {
  try {
    const response = await  signInWithPopup(auth, provider)
    const  User = response.user
    const name = User.displayName
    const email = User.email
    const result = await axios.post(serverUrl + "/api/auth/google", {name, email}, {
      withCredentials:true
    })
    console.log(result.data)
  } catch (error) {
    
  }
}

  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8 sm:px-6 lg:px-7'>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className='max-w-7xl mx-auto mt-6 sm:mt-8 rounded-3xl 
        bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900
        text-white
        px-6 sm:px-8 py-5 sm:py-6
        shadow-[0_20px_45px_rgba(30,64,175,0.45)]
        border border-blue-600/40
        relative overflow-hidden'>

        <h1 className='text-xl sm:text-2xl font-bold 
        bg-gradient-to-r from-white via-gray-300 to-white 
        bg-clip-text text-transparent'>
          ExamNotes AI
        </h1>

        <p className='text-xs sm:text-sm text-gray-300 mt-1'>
          AI-Powered exam-oriented notes & revision
        </p>

      </motion.header>

      {/* Main Section */}
      <main className='max-w-7xl mx-auto py-12 
      grid grid-cols-1 lg:grid-cols-2 
      gap-12 lg:gap-20 items-center'>

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className='text-center lg:text-left'
        >
          <h1 className='text-5xl lg:text-6xl
          font-extrabold leading-tight 
          bg-gradient-to-br from-black via-gray-800 to-black 
          bg-clip-text text-transparent'>
            Unlock Smart <br className='hidden sm:block' /> AI Notes
          </h1>

          <motion.button
          onClick={handleGoogleAuth}
            whileHover={{
              y: -10,
              scale: 1.07,
              rotateX: 8,
              rotateY: -8,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 18,
              mass: 0.6
            }}
            className='mt-10 px-10 py-3 rounded-xl 
  flex items-center gap-3 
  bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900
  border border-blue-500/40
  text-white font-semibold text-lg
  shadow-[0_20px_40px_rgba(30,64,175,0.45)]
  relative overflow-hidden transition-all duration-300'>
            <FcGoogle size={22} />
            Continue with Google
          </motion.button>

          <p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent' >
            You get <span className='font-semibold '>50 FREE credits</span> to create exam notes, project notes, charts, graphs and
            download clean PDFs - instantly using AI.
          </p>
          <p> Start with 50 credits • Upgrade anytime • Instant access</p>


        </motion.div>

        {/* Right Content */}

        <motion.div 
        initial={{opacity:0, x:60}}
        animate={{opacity:1, x:0}}
        transition={{duration:1.6}}
        className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <Feature 
          icon="🎁" 
          title= "50 Free Credits "
          des =' Start with 50 credits to generate notes without paying '
          />
          <Feature 
          icon="📘" 
          title= "Exam Notes "
          des =' High-yield, revision-ready exam-oriented notes. '
          />
          <Feature 
          icon="📂" 
          title= "Project Notes "
          des ='Well-structured documentaion for assignment.'
          />
          <Feature 
          icon="📊" 
          title= "Chart & Graph"
          des =' Auto-generated diagram, charts and flow graphs. '
          />
          <Feature 
          icon="⬇️" 
          title= "Free PDF Download"
          des ='Download clean, printable PDFs instantly. '
          />
        

        </motion.div>

      </main>

    </div>
  )
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className='relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white'
      style={{ transformStyle: "preserve-3d" }}>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none'/>

        <div className='relative z-10' style={{ transform: "translateZ(30px)" }}>
          <div className='text-4xl mb-3'>{icon}</div>
          <h3 className='text-lg font-semibold mb-2'>{title}</h3>
          <p className='text-gray-300 text-sm leading-relaxed'>{des}</p>
        </div>
      
    </motion.div>
  )
}

export default Auth
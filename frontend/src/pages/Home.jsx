import React from 'react'
import Navbar from '../components/navBar'
import { motion } from "motion/react"
import image1 from '../assets/image1.png'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='relative min-h-screen bg-white text-black overflow-hidden'>
      <Navbar />
      {/* Top section */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center  '>

        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "prserve-3d" }}
          >
            <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)"
              }}
            >
              Create smart <br /> AI Notes in Seconds
            </motion.h1>


            <motion.p
              whileHover={{ y: -2 }}
              className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-700/80 to-gray-700 bg-clip-text text-transparent'
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)"
              }}
            >
              Generate Exam-focus notes, project documentation flow diagrams and revision ready-content using AI - Faster and cleaner and smarter
            </motion.p>

            <motion.button

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
              Get Started
            </motion.button>

          </motion.div>
        </div>


        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -12,
            rotateX: 8,
            rotateY: -8,
            scale: 1.05
          }}
          className='transform-gpu '
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className='overflow-hidden rounded-4xl'>
            <img src={image1} alt="img"
              style={{ transform: "translateZ(35px)" }}
            />

          </div>

        </motion.div>

      </section>

      {/* Bottom */}
      <section className='max-w-6xl mx-auto px-8 py-25 grid grid-cols-1 md:grid-cols-4 gap-10'>
<Feature icon="📘" title="Exam Notes" des="High-Yield exam-oriented notes with revision points." />
<Feature icon="📂" title="Project Notes" des="Well-structured content for assignment and projects." />
<Feature icon="📊" title="Diagrams" des="Atuo-generate visual diagram for clarity." />
<Feature icon="⬇️" title="PDF Download" des="Download clean, printable PDFs instantly." />
      </section>

<Footer/>

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
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none' />

      <div className='relative z-10' style={{ transform: "translateZ(30px)" }}>
        <div className='text-4xl mb-3'>{icon}</div>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <p className='text-gray-300 text-sm leading-relaxed'>{des}</p>
      </div>

    </motion.div>
  )
}

export default Home
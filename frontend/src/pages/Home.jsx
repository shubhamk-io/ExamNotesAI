import React from 'react'
import Navbar from '../components/navBar'
import { transform } from 'motion/react'

const Home = () => {
  return (
    <div className='relative min-h-screen bg-white text-black overflow-hidden'>
      <Navbar />
      {/* Top section */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center  '>

<div>
<motion.div 
initial={{opacity:0, x: -60}}
animate={{opacity:1, x:0}}
transition={{duration:0.7}}
whileHover={{rotateX:6 , rotateY:-6}}
className="transform-gpu"
style={{transformStyle:"prserve-3d"}}
>
  <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent" 
  whileHover={{y:-4}}
  style={{
    transform:"translateZ(40px)",
    textShadow:"0 18px 40px rgba(0,0,0,0.25)"
  }}
  
  ></motion.h1>

</motion.div>
</div>


<div></div>

      </section>

      {/* Bottom */}
      <section></section>

    </div>
  )
}

export default Home
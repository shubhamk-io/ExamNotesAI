import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import examnoteslogo from "../assets/examlogo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits;
  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 mx-6 mt-6 rounded-xl
      bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900
      backdrop-blur-xl
      border border-blue-400/30
      shadow-[0_10px_30px_rgba(30,64,175,0.35)]
      flex items-center justify-between px-6 py-1.5
      text-white"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Logo */}
        <div className="bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20">
          <img
            src={examnoteslogo}
            alt="StudentNotes AI"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Text */}
        <span className="text-base hidden md:block font-semibold tracking-wide">
          StudentNotes
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent ml-1">
            AI
          </span>
        </span>
      </div>

      <div className="flex items-center relative gap-6">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.07 }}
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
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
          </motion.div>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
              >
                <h4 className="font-semibold mb-2 ">Buy Credits</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Use credits to generate AI notes, diagrams & PDFs.
                </p>
                <button
                  onClick={() => setShowCredits(false)}
                  className="w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-lg">
              {userData?.name.slice(0, 1).toUpperCase()}
            </span>
          </motion.div>
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-52 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

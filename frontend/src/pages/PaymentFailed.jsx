import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="text-center">

        {/* ❌ Animated Cross */}
        <motion.div
          initial={{ scale: 0, y: -100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="w-28 h-28 mx-auto rounded-full bg-red-100 flex items-center justify-center shadow-lg"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-5xl text-red-600"
          >
            ✕
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mt-6"
        >
          Payment Failed
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 mt-2"
        >
          Something went wrong. Please try again.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 mt-6 justify-center"
        >
          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow hover:bg-red-700 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Home
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default PaymentFailed;
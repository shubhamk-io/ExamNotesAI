import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="text-center">

        {/* ✅ Animated Tick */}
        <motion.div
          initial={{ scale: 0, y: -100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center shadow-lg"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-5xl text-green-600"
          >
            ✓
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mt-6"
        >
          Payment Successful
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 mt-2"
        >
          Your credits have been added 🎉
        </motion.p>

        {/* Redirect text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-gray-400 mt-2"
        >
          Redirecting in 5 seconds...
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition"
        >
          Go to Dashboard
        </motion.button>

      </div>
    </div>
  );
};

export default PaymentSuccess;
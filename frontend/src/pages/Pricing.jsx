import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import axios from 'axios';
import { serverUrl } from '../App';

const Pricing = () => {

  const navigate = useNavigate()
  const [selectedPrice, setSelectPrice] = useState(null)
  const [paying, setPaying] = useState(false)
  const [payingAmount, setPayingAmoutn] = useState(null)

  const handlePaying = async (amount) => {
    try {
      setPayingAmoutn(amount)
      setPaying(true)
const result = await axios.post(serverUrl +  "/api/credit/order", {amount}, {withCredentials:true})

if(result.data.url){
  window.location.href = result.data.url
}
setPaying(false)
      
    } catch (error) {
      setPaying(false)
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-10 relative'>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className='flex items-center gap-2 text-gray-600 hover:text-black mb-6'>
        ⬅️ Back
      </button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-10'
      >
        <h1 className='text-4xl font-extrabold text-gray-800'>Buy Credits</h1>
        <p className='text-gray-600 mt-2'>Choose a plan that fits your study needs</p>
      </motion.div>

      {/* Cards */}
      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>

        <PricingCard
          title="Starter"
          price="$2"
          amount={2}
          credits="50 Credits"
          description="Perfect for quick revision"
          features={[
            "Generate AI notes",
            "Exam-Focused answers",
            "Diagram & Chart support",
            "Fast Generation"
          ]}
          selectPrice={selectedPrice}
          setSelectPrice={setSelectPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Popular"
          price="$5"
          amount={5}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter Features",
            "More credits per $",
            "Revision mode access",
            "Priority AI response"
          ]}
          selectPrice={selectedPrice}
          setSelectPrice={setSelectPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="$9"
          amount={9}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credits value",
            "Unlimited revision",
            "Charts & diagram",
            "Ideal for full syllabus"
          ]}
          selectPrice={selectedPrice}
          setSelectPrice={setSelectPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

      </div>
    </div>
  )
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  selectPrice,
  setSelectPrice,
  onBuy,
  paying,
  payingAmount
}) {

  const isSelected = selectPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  const isPopular = title === "Popular";

  return (
    <motion.div
      onClick={() => setSelectPrice(amount)}
      whileHover={{ scale: isPopular ? 1.06 : 1.04 }}
      className={`relative cursor-pointer rounded-2xl p-[1px] transition-all duration-300
        ${isSelected
          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-[0_0_25px_rgba(99,102,241,0.6)]"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        }
        ${isPopular ? "scale-105 z-10" : ""}
        ${isSelected ? "scale-105 z-20" : ""}
      `}
    >
      <div className={`rounded-2xl p-6 backdrop-blur-lg h-full relative
        ${isSelected 
          ? "bg-white shadow-2xl border border-indigo-200" 
          : "bg-white/90 shadow-xl"
        }`}>

        {/* 🔥 MOST POPULAR Badge */}
        {isPopular && !isSelected && (
          <div className="absolute -top-3 right-3">
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-gradient-to-r from-pink-500 to-yellow-500 opacity-70 rounded-full"></div>
              <span className="relative text-[11px] font-semibold tracking-wide px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg border border-white/20">
                🔥 MOST POPULAR
              </span>
            </div>
          </div>
        )}

        {/* ⚡ SELECTED Badge */}
        {isSelected && (
          <div className="absolute -top-3 right-3">
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-indigo-500 opacity-60 rounded-full"></div>
              <span className="relative flex items-center gap-1 text-[11px] font-semibold px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg border border-white/20">
                ⚡ SELECTED
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>

        {/* Price */}
        <div className="mt-5">
          <p className="text-4xl font-extrabold text-gray-900">{price}</p>
          <p className="text-sm font-medium text-indigo-600">{credits}</p>
        </div>

        {/* Button */}
        <button
          disabled={isPayingThisCard}
          onClick={(e) => {
            e.stopPropagation();
            onBuy(amount);
          }}
          className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-300
          ${
            isPayingThisCard
              ? "bg-gray-300 cursor-not-allowed"
              : isSelected
                ? "bg-black text-white hover:opacity-90"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-[1.03] shadow-md"
          }`}
        >
          {isPayingThisCard ? "Processing..." : "Buy Now 🚀"}
        </button>

        {/* Features */}
        <ul className="mt-6 space-y-3 text-sm text-gray-700">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

export default Pricing
import React, { useState } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";

const Topics = ({ loading, setLoading, setResult, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setrevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please Enter Your topic");
      return;
    }
    setError("");
    setLoading(true);

 try {
    const result = await generateNotes({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
    });
setResult(result.data)
setLoading(true)
    
  } catch (error) {
    console.log(error)
    setError("Failed to Fetch notes from server")
    setLoading(false)
  }

  };

 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl 
            bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800
            border border-blue-400/30
            backdrop-blur-xl
            shadow-[0_15px_40px_rgba(30,64,175,0.35)]
            p-8 space-y-6 text-white"
    >
      <input
        type="text"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Enter topic (e.g. Web development)"
      />
      <input
        type="text"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Class / Level (e.g. Class 10)"
      />
      <input
        type="text"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
      />

      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Examination Mode "
          checked={revisionMode}
          onChange={() => setrevisionMode(!revisionMode)}
        />

        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />

        <Toggle
          label="Include Chart "
          checked={includeCharts}
          onChange={() => setIncludeCharts(!includeCharts)}
        />
      </div>

      <motion.button
      onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed "
            : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.25)] "
        } `}
      >
        {loading ? "Generating Notes... " : "Generate Notes"}
      </motion.button>
    </motion.div>
  );
};

function Toggle({ onChange, label, checked }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none "
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgb(34,197,94)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20  backdrop-blur-lg"
      >
        <motion.div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          style={{
            left: checked ? "1.6rem" : "0.25rem",
          }}
        ></motion.div>
      </motion.div>
      <span
        className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300 "}`}
      >
        {label}
      </span>
    </div>
  );
}

export default Topics;

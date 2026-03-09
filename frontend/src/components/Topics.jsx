import React, { useState } from "react";
import { motion } from "motion/react";

const Topics = () => {
    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setsevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);

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
        onClick={(e) => setTopic(e.target.value)}
        value={topic}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Enter topic (e.g. Web development)"
        />
        <input
        type="text"
        onClick={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Class / Level (e.g. Class 10)"
        />
        <input
        type="text"
        onClick={(e) => setExamType(e.target.value)}
        value={examType}
        className="w-full 
p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-blue-300/40 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-200 transition-all duration-300 shadow-md focus:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
        />
        <div className="flex flex-col md:flex-row gap-6"></div>
        <toggle />
    </motion.div>
    );
};

function toggle({ onChange, label, checked }) {
    return (
    <div
        className="flex items-center gap-4 cursor-pointer select-none "
        onClick={onChange}
    >
        <motion.div
        animate={{
            backgroundColor: checked
            ? "rgba(34, 197, 94, 0, 35 )" // Green when ON
            : "rgba(255, 255, 255, 0.15)", // Gray when OFF
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20  backdrop-blur-lg"
        >
        <motion.div
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            style={{
            left: checked ? "1.6rem" : "0.25rem",
            }}
        >
            <span
            className={`text-sm transition-color ${checked ? "text-green-300" : "text-gray-300 "}`}
            >
            {label}
            </span>
        </motion.div>
        </motion.div>
    </div>
    );
}

export default Topics;

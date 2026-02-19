import { motion } from "motion/react";
import { Play } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import mindfulKidsImage from "../assets/Mind.png";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/UnitsPage");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden ">
      <AnimatedBackground />
      <AnimatedCharacter />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md lg:max-w-lg "
      >
        <img
          src={mindfulKidsImage}
          alt="Mindful Kids 1"
          className="w-full h-auto drop-shadow-2xl"
        />
      </motion.div>

     
        <motion.button
          onClick={handlePlayClick}
          className="fixed right-12 sm:right-16 md:right-20 top-1/2 -translate-y-1/2 z-20 group floating-btn"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-40 blur-xl"
            style={{ backgroundColor: '#4a78bc' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: '#4a78bc' }}
            animate={{
              scale: [1, 1.4],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center text-white shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #07b6a9 0%, #34c9c0 100%)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear"
              }}
            />

            {/* Content */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Play className="w-12 h-12 sm:w-16 sm:h-16 mb-1" fill="currentColor" />
            </motion.div>
            <span className="text-base sm:text-lg font-bold relative z-10">Let's Play!</span>
          </div>
        </motion.button>
    </div>
  );
}

export default HomePage;
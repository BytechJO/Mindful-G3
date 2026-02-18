import { motion } from "framer-motion";

import characterImage from '../assets/ch.png';

export function AnimatedCharacter() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <img
        src={characterImage}
        alt="Mindful Kids Character"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 drop-shadow-lg"
      />
    </motion.div>
  );
}
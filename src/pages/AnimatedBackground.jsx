import { motion } from "framer-motion";

import { Book, GraduationCap, Pencil, BookOpen, Lightbulb, Award } from 'lucide-react';

const floatingIcons = [
  { Icon: Book, color: 'text-blue-400', size: 'w-8 h-8' },
  { Icon: GraduationCap, color: 'text-yellow-400', size: 'w-10 h-10' },
  { Icon: Pencil, color: 'text-pink-400', size: 'w-6 h-6' },
  { Icon: BookOpen, color: 'text-green-400', size: 'w-12 h-12' },
  { Icon: Lightbulb, color: 'text-orange-400', size: 'w-10 h-10' },
  { Icon: Award, color: 'text-blue-500', size: 'w-8 h-8' },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => {
        const { Icon, color, size } = item;
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;

        return (
          <motion.div
            key={index}
            className={`absolute ${color} ${size} opacity-20`}
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
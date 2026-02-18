// src/wrappers/FeedbackWrapper.jsx (أو أي مسار تختاره)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, PlayCircle, ChevronLeft, Menu } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// 1. استيراد المكون الموحد الذي يعتمد على البيانات
import FeedbackPage from "../component/FeedbackPage";

import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import logo from "../assets/PreissMurphy Logo-BGSDEhSA (1).svg";

const lessons = [
  { number: 1, color: "from-blue-400 to-blue-500" },
  { number: 2, color: "from-green-400 to-green-500" },
  { number: 3, color: "from-pink-400 to-pink-500" },
];

// اسم المكون يبقى كما هو بناءً على طلبك
const FeedbackWrapper = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLessonSelect = (lessonNumber) => {
    // عند اختيار درس جديد، اذهب إلى بداية الدرس (صفحة القصة)
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
    setIsMenuOpen(false);
  };

  const handleBackToUnits = () => {
    navigate("/UnitsPage");
  };

  const handlePrevious = () => {
    // السهم الأيسر في صفحة التقييم يجب أن يعود إلى صفحة الكويز
    navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
  };

  // لا يوجد زر "Next" في صفحة التقييم، لذلك لا نحتاج handleNext

  return (
    // كل التصميم الخارجي والفوتر يبقى كما هو تماماً
    <div className="h-screen w-screen relative overflow-hidden flex flex-col ">
      <AnimatedBackground />
      <AnimatedCharacter />

      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <button onClick={handlePrevious} className="feedquiz left">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-full"
          >
            <h1 className="shine-text text-4xl sm:text-5xl font-bold text-center lg:mt-8">
              Unit {unitId}
            </h1>
            
            {/* 2. عرض مكون FeedbackPage الموحد مباشرة */}
            {/* هو سيقوم بجلب الصورة الصحيحة من lessonsData.js بنفسه */}
            <FeedbackPage />

          </motion.div>
        </div>
        {/* لا يوجد سهم أيمن في صفحة التقييم */}
      </div>

      {/* الفوتر يبقى كما هو تماماً */}
      <div className="w-full h-[2px] bg-white/30 relative z-10"></div>
      <motion.div
        className="relative z-10 py-4 px-4 sm:px-6 bg-white border-t"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
                      <img src={logo} alt="J1 Logo" className="h-10 w-auto" />
          
                      <motion.button
                        onClick={handleBackToUnits}
                        className="
                    relative z-50
                    px-4 py-2 rounded-xl border font-medium
                    transition-all duration-200 text-sm
                    flex items-center gap-2
                    border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50
                  "
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Home className="w-5 h-5" />
                        <span className="hidden sm:inline text-base">Units</span>
                      </motion.button>
                    </div>
          <div className="relative flex items-center gap-2">
            <div className="xl:flex items-center absolute right-60 gap-2">
              {lessons.map((l) => (
                <button
                  key={l.number}
                  onClick={() => handleLessonSelect(l.number)}
                  className={`whitespace-nowrap rounded-xl border font-medium transition-all duration-200 px-4 py-2 text-sm flex items-center gap-2 ${Number(lessonId) === l.number ? `border-[#6B40C8] text-white bg-gradient-to-r ${l.color}` : "border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50"}`}
                >
                  <PlayCircle className="w-5 h-5" />
                  Lesson {l.number}
                </button>
              ))}
            </div>
            <div className="xl:hidden">
              <button onClick={() => setIsMenuOpen((v) => !v)} /* ... */ >
                <Menu className="w-5 h-5" />
              </button>
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div /* ... */ >
                  {/* ... */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackWrapper;

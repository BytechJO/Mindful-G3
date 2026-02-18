import { motion } from "framer-motion";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// بيانات الوحدات
const units = [
  { id: 1, name: 'One', color: '#6a3996', unitName: 'One' },
  { id: 2, name: 'Two', color: '#6a3996', unitName: 'Two' },
  { id: 3, name: 'Three', color: '#6a3996', unitName: 'Three' },
  { id: 4, name: 'Four', color: '#6a3996', unitName: 'Four' },
];

// بيانات الدروس (مشتركة لكل الوحدات)
const lessons = [
  { id: 1, name: 'Lesson One' },
  { id: 2, name: 'Lesson Two' },
  { id: 3, name: 'Lesson Three' },
];

// أيقونات SVG كـ React Components
const StoryIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={className} fill="#6a3996">
    <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
  </svg>
 );

const QuizIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={className} fill="#6a3996">
    <path d="M400 416C497.2 416 576 337.2 576 240C576 142.8 497.2 64 400 64C302.8 64 224 142.8 224 240C224 258.7 226.9 276.8 232.3 293.7L71 455C66.5 459.5 64 465.6 64 472L64 552C64 565.3 74.7 576 88 576L168 576C181.3 576 192 565.3 192 552L192 512L232 512C245.3 512 256 501.3 256 488L256 448L296 448C302.4 448 308.5 445.5 313 441L346.3 407.7C363.2 413.1 381.3 416 400 416zM440 160C462.1 160 480 177.9 480 200C480 222.1 462.1 240 440 240C417.9 240 400 222.1 400 200C400 177.9 417.9 160 440 160z" />
  </svg>
 );

const FeedbackIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={className} fill="#6a3996">
    <path d="M267.7 576.9C267.7 576.9 267.7 576.9 267.7 576.9L229.9 603.6C222.6 608.8 213 609.4 205 605.3C197 601.2 192 593 192 584L192 512L160 512C107 512 64 469 64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L359.6 512L267.7 576.9zM332 472.8C340.1 467.1 349.8 464 359.7 464L480 464C506.5 464 528 442.5 528 416L528 192C528 165.5 506.5 144 480 144L160 144C133.5 144 112 165.5 112 192L112 416C112 442.5 133.5 464 160 464L216 464C226.4 464 235.3 470.6 238.6 479.9C239.5 482.4 240 485.1 240 488L240 537.7C272.7 514.6 303.3 493 331.9 472.8z" />
  </svg>
 );

// بيانات محتوى الدرس
const lessonContent = [
  { name: 'Story', path: '', icon: StoryIcon },
  { name: 'Comprehension', path: 'quiz', icon: QuizIcon },
  { name: 'Self-Assessment', path: 'feedback', icon: FeedbackIcon },
];



export default function UnitsPage() {
  const navigate = useNavigate();
  const [openUnitId, setOpenUnitId] = useState(null);
  const [openLessonId, setOpenLessonId] = useState(null);
  const menuRef = useRef(null);

  const handleUnitClick = (unitId) => {
    setOpenUnitId(openUnitId === unitId ? null : unitId);
    setOpenLessonId(null); // أغلق قائمة الدروس عند تغيير الوحدة
  };

  const handleLessonClick = (e, lessonId) => {
    e.stopPropagation();
    setOpenLessonId(openLessonId === lessonId ? null : lessonId);
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenUnitId(null);
      setOpenLessonId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <div className="max-h-full w-full flex flex-col items-center justify-center p-4 sm:p-20 relative ">
      <AnimatedBackground />
      <AnimatedCharacter />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl mb-7 text-center relative z-10"
        style={{ color: '#284660' }}
      >
        Choose a Unit
      </motion.h1>

      <div ref={menuRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl w-full relative z-10">
        {units.map((unit) => (
          <motion.div
            key={unit.id}
            role="button"
            tabIndex={0}
            onClick={() => handleUnitClick(unit.id)}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all relative group flex items-center gap-4 sm:gap-6 cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: unit.color }}>
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="flex-1 text-left">

              <div className="text-2xl sm:text-3xl font-semibold" style={{ color: unit.color }}>
                {unit.name}
              </div>
              
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"
              style={{ backgroundColor: unit.color }}
            />

            {openUnitId === unit.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-xl mt-3 p-3 z-20 flex flex-col gap-2 border border-gray-100"
              >
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="relative flex flex-col sm:flex-row">
                    <button
                      onClick={(e) => handleLessonClick(e, lesson.id)}
                      className={`w-full py-3 px-4 rounded-xl text-left flex justify-between items-center transition-all duration-300 ${openLessonId === lesson.id ? 'bg-purple-200 text-purple-900 font-semibold shadow-inner' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      <span>{lesson.name}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${openLessonId === lesson.id ? 'rotate-90' : ''}`} />
                    </button>

                    {openLessonId === lesson.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="relative w-full mt-2 sm:absolute sm:left-full sm:top-0 sm:ml-2 sm:w-auto bg-white rounded-2xl shadow-xl p-3 flex flex-col gap-2 sm:min-w-[250px] border border-gray-100 z-30"
                      >
                        {lessonContent.map((content) => {
                          const Icon = content.icon;
                          return (
                            <button
                              key={content.path}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/unit/${unit.unitName}/lesson/${lesson.id}/${content.path}`);
                              }}
                              className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-purple-100 text-left text-gray-700 border-l-4 border-transparent hover:border-purple-300"
                            >
                              <Icon className="w-6 h-6" />
                              <span className="text-sm font-medium">{content.name}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
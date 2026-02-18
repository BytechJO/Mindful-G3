// src/components/FeedbackPage.jsx (أو أي مسار تختاره)

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { lessonsData } from '../../Data/lessonsData';
import StarRating from '../shared/StarRating.jsx';
import '../shared/feedBack.css';

function FeedbackPage() {
  const { unitId, lessonId } = useParams();

  // --- 2. جلب بيانات التقييم للدرس الحالي ---
  const feedbackData = useMemo(() => lessonsData[unitId]?.[lessonId]?.feedback, [unitId, lessonId]);

  const [ratings, setRatings] = useState({ r1: 0, r2: 0, r3: 0 });

  // --- التحقق من وجود بيانات ---
  if (!feedbackData) {
    return <div className="paper-feedback"><h1>Feedback data not found.</h1></div>;
  }

  const { image } = feedbackData;

  // --- Handlers & Logic ---
  const handleSubmit = () => {
    Swal.fire({
      icon: 'success',
      title: 'You did a great job!',
      text: 'Click on the next lesson below to continue.',
      confirmButtonText: 'Done'
    });
    // يمكنك هنا إضافة منطق للانتقال للدرس التالي تلقائياً إذا أردت
  };

  const isAllRated = ratings.r1 > 0 && ratings.r2 > 0 && ratings.r3 > 0;

  // ====================================================================================
  // JSX - العرض
  // ====================================================================================
  return (
    <div id="p4" className="paper-feedback animate__animated animate__backInDown">
      {/* 3. استخدام الصورة من البيانات */}
      <img src={image} alt="Feedback background" className="feedback-bg-img" />

      <div
        className="stars-container absolute left-[47%] transform -translate-x-1/2 flex flex-col"
        style={{ top: '60%' }}
      >
        <StarRating
          value={ratings.r1}
          onChange={(val) => setRatings(prev => ({ ...prev, r1: val }))}
        />
        <StarRating
          value={ratings.r2}
          onChange={(val) => setRatings(prev => ({ ...prev, r2: val }))}
        />
        <StarRating
          value={ratings.r3}
          onChange={(val) => setRatings(prev => ({ ...prev, r3: val }))}
        />
      </div>

      <button
        type="button"
        id="feedBtn"
        disabled={!isAllRated}
        onClick={handleSubmit}
        className={`mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all sm:px-4 sm:py-2 absolute transform -translate-x-1/2 ${!isAllRated ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-purple-600 hover:scale-105"}`}
      >
        Finish
      </button>
    </div>
  );
}

export default FeedbackPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '../../Data/lessonsData';
import ValidationAlert from '../shared/ValidationAlert';
import '../shared/Quiz.css';
import Spinner from './Spinner';

const Timg = "/gif/Approve.gif";
const Fimg = "/gif/False.gif";


const QuestionText = ({ text, wordsPerLine = 9 }) => {
  // تقسيم النص إلى كلمات
  const words = text.split(" ");

  // تقسيم إلى أسطر
  const lines = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }

  return (
    <span className="question-text">
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {idx < lines.length - 1 && (
            <>
              <br />
              <span className="line-break" />
            </>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};


export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const unit = unitId;
  const lesson = lessonId;

  // --- إعادة تعيين الحالة عند تغيير الدرس ---
  const quizData = lessonsData[unit]?.[lesson]?.quiz;

  useEffect(() => {
    if (quizData?.questions?.length) {
      const initialAnswers = quizData.questions.reduce((acc, q) => ({ ...acc, [q.id]: null }), {});
      setAnswers(initialAnswers);
      setResults({});
      setIsSubmitted(false);
      setIsLoading(false); // انتهى اللودنج
    } else {
      setIsLoading(true); // إذا ما في بيانات
    }
  }, [quizData]);


  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleTryAgain = () => {
    const initialAnswers = {};
    questions.forEach(q => {
      initialAnswers[q.id] = null;
    });


    setAnswers(initialAnswers);
    setResults({});
    setIsSubmitted(false);
  };


  const handleSubmit = () => {
    const unansweredQuestions = Object.values(answers).some(ans => ans === null);
    if (unansweredQuestions) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }

    const newResults = {};
    const correctAnswers = {};
    questions.forEach(q => {
      newResults[q.id] = answers[q.id] === q.correctAnswer;
      correctAnswers[q.id] = q.correctAnswer;
    });

    setResults(newResults);
    setIsSubmitted(true);

    const score = Object.values(newResults).filter(Boolean).length;
    const totalQuestions = questions.length;
    const scoreString = `${score}/${totalQuestions}`;

    if (score === totalQuestions) {
      ValidationAlert.success("Excellent!", "", scoreString)
        .then(() => navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`));
    } else {
      ValidationAlert.error("You can do it!", "", scoreString);
    }
  };

  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };

  const renderAnswerGif = (questionId, optionValue) => {
    if (!isSubmitted || answers[questionId] !== optionValue) return null;
    return results[questionId]
      ? <img src={Timg} alt="correct" className="answer-gif" />
      : <img src={Fimg} alt="wrong" className="answer-gif" />;
  };

  if (!quizData?.questions?.length) {
    return <Spinner />
  }
  if (isLoading) {
    return <Spinner />;
  }
  const { questions, image } = quizData;
  console.log("path" + image)
  return (
    <div className="story-pages-container"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: "80vh", borderRadius: "35px" }}>
      <div className="w-full max-w-8xl" >
        <div className="paper animate__animated animate__backInDown" id="p3">
          <div className="content" >
            <div className="questions mt-[-15px]">
              {/* 4. المرور على الأسئلة وعرضها ديناميكياً */}
              {questions.map((q) => (
                <div className="Q1 question-container" key={q.id}>
                  <QuestionText text={q.text} />
                  <ul>
                    {q.options.map((option, index) => (
                      <li key={index}>
                        <p>{option}</p>
                        <input
                          type="radio"
                          name={q.id}
                          value={String(index)}
                          checked={answers[q.id] === String(index)}
                          onChange={handleChange}
                          disabled={isSubmitted}
                        />
                        {renderAnswerGif(q.id, String(index))}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div id="buttonsContainer">
              <button
                type="button"
                className="try-btn"
                onClick={handleTryAgain}
                disabled={!isSubmitted} // يظهر فقط بعد الإرسال
              >
                Try again
              </button>

              <button
                type="button"
                id="submitBtn"
                onClick={handleSubmit}
                disabled={isSubmitted} // يمنع الضغط بعد الإرسال
              >
                Submit
              </button>

              <button
                type="button"
                className="skip-btn"
                onClick={handleSkip}
                disabled={!isSubmitted} // يظهر فقط بعد الإرسال
              >
                Skip
              </button>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;

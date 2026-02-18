import { useEffect, lazy,  } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import UnitsPage from "./pages/UnitsPage";
import QuizWrapper from "./pages/quizwrapper";
import FeedbackWrapper from "./pages/feedbackwrapper";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import Spinner from "./component/Spinner";


function App() {

  const location = useLocation();
  // useEffect(() => {
  //   console.log("Current path:", location.pathname);
  // }, [location]);

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/UnitsPage" element={<UnitsPage />} />

      <Route path="/unit/:unitId/lesson/:lessonId" element={<VideoPlayerPage key={location.pathname} />} />

      <Route path="/unit/:unitId/lesson/:lessonId/quiz" element={<QuizWrapper />} />
      <Route path="/unit/:unitId/lesson/:lessonId/feedback" element={<FeedbackWrapper />} />
    </Routes>
  );
}

export default App;

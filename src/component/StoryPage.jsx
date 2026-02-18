// src/components/StoryPage.jsx (Final and Modified Version)

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { lessonsData } from '../../Data/lessonsData.js'; // Make sure this path is correct
import '../shared/StoryPage.css'; // Make sure this path is correct

export const StoryPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [extraBubble, setExtraBubble] = useState(null);

  const [selectedWords, setSelectedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showWrongFeedback, setShowWrongFeedback] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [textHighlight, setTextHighlight] = useState(true);
  const [narrationHighlight, setNarrationHighlight] = useState(true);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const videoRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const settingsPopupRef = useRef(null);
  const lesson = useMemo(() => lessonsData[unitId]?.[lessonId], [unitId, lessonId]);

  // --- START: MODIFICATIONS ---

  const { videos, extraBubblesData, cloudPositions, interactiveTask } = lesson || {};
  const currentVideoData = videos?.[currentVideo];

  // 1. Get the index of the currently active subtitle
  const activeSubtitleIndex = useMemo(() => {
    if (!currentVideoData?.subtitles) return -1;
    return currentVideoData.subtitles.findIndex(sub => currentTime >= sub.start && currentTime < sub.end);
  }, [currentTime, currentVideoData]);

  // 2. Determine if the current subtitle is the last one
  const isLastSubtitle = useMemo(() => {
    if (!currentVideoData?.subtitles || activeSubtitleIndex === -1) return false;
    return activeSubtitleIndex === currentVideoData.subtitles.length - 1;
  }, [activeSubtitleIndex, currentVideoData]);

  // 3. Check if the current video is the one with the interactive task
  const isInteractiveVideo = useMemo(() => {
    return interactiveTask && currentVideo === interactiveTask.videoIndex;
  }, [currentVideo, interactiveTask]);

  // --- END: MODIFICATIONS ---

  if (!lesson || !currentVideoData) {
    return <div className="story-page-container"><h1>Lesson data not found.</h1></div>;
  }

  const handleNext = useCallback(() => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(prev => prev + 1);
    } else {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    }
    setShowBanner(false);
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  const handlePrevious = () => setCurrentVideo(prev => (prev > 0 ? prev - 1 : 0));
  const togglePlay = () => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause();
  const toggleFullscreen = () => document.fullscreenElement ? document.exitFullscreen() : fullscreenContainerRef.current?.requestFullscreen();
  const toggleMute = () => setIsMuted(prev => !prev);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const handleWordClick = (word) => {
    if (!isInteractiveVideo) return;
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");
    if (!interactiveTask.correctWords.includes(cleanWord)) {
      setShowWrongFeedback(true);
      setTimeout(() => setShowWrongFeedback(false), 2000);
      return;
    }
    const newWords = [...new Set([...selectedWords, cleanWord])];
    setSelectedWords(newWords);
    if (interactiveTask.correctWords.every(cw => newWords.includes(cw))) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        handleNext();
      }, 2000);
    }
  };

  const handleEnded = useCallback(() => {
    if (isInteractiveVideo) {
      setShowBanner(true);
    } else if (autoPlayNext) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  }, [isInteractiveVideo, autoPlayNext, handleNext]);

  useEffect(() => {
    setSelectedWords([]);
    setShowFeedback(false);
    setShowWrongFeedback(false);
    setShowBanner(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [currentVideo, playbackSpeed, isMuted, volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false); // Set loading to false here
    };
    
    setIsLoading(true); // Set loading to true when src changes

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadeddata', onLoadedData);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadeddata', onLoadedData);
    };
  }, [currentVideoData.url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.volume = volume;
    video.playbackRate = playbackSpeed;
  }, [isMuted, volume, playbackSpeed]);

  useEffect(() => {
    const bubble = extraBubblesData?.find(b => b.videoIndex === currentVideo && currentTime >= b.start && currentTime < b.end);
    setExtraBubble(bubble || null);
  }, [currentTime, currentVideo, extraBubblesData]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    const handleClickOutside = (event) => {
      if (settingsPopupRef.current && !settingsPopupRef.current.contains(event.target)) {
        setShowSettingsPopup(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeSubtitle = useMemo(() => activeSubtitleIndex !== -1 ? currentVideoData.subtitles[activeSubtitleIndex] : null, [activeSubtitleIndex, currentVideoData.subtitles]);
  
  const bubbleStyle = useMemo(() => {
    return cloudPositions?.[currentVideo]?.[activeSubtitleIndex] || {};
  }, [activeSubtitleIndex, currentVideo, cloudPositions]);

  return (
    <div className="story-page-container">
      <div ref={fullscreenContainerRef} className="video-wrapper">
        {isLoading && (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        )}
        <video
          ref={videoRef}
          key={currentVideoData.url}
          className={`w-full h-full object-cover ${isFullscreen ? 'fixed inset-0' : 'aspect-video'}`}
          onEnded={handleEnded}
          preload="auto"
          src={currentVideoData.url}
        />

        {showWrongFeedback && <div className="wrong-feedback">Try Again! ❌</div>}
        {showFeedback && <div className="feedback-popup">Good Job! 👍</div>}
        {showBanner && isInteractiveVideo && (
          <div className={`instruction-banner show ${isFullscreen ? 'fullscreen-banner' : ''}`}>
            {interactiveTask.instruction.map((line, index) => (
              <p key={index} style={{ fontSize: '1.8em', textAlign: 'left' }}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* --- Subtitles & Captions --- */}
        {showSubtitles && activeSubtitle && (
          <div className="subtitle-container" style={bubbleStyle}>
            {/* --- START: DYNAMIC CLASSNAME --- */}
            <div
              className={`bubble-cloud animate__animated animate__fadeIn
                ${isInteractiveVideo && isLastSubtitle ? "question-bubble" : ""}
                ${bubbleStyle.isFlipped ? "flipped" : ""}
              `}
            >
            {/* --- END: DYNAMIC CLASSNAME --- */}
              <p>
                {activeSubtitle.words.map((word, index) => (
                  <span key={index} onClick={() => handleWordClick(word.text)} className={`word-span ${textHighlight && currentTime >= word.start && currentTime < word.end ? 'active-word' : ''} ${selectedWords.includes(word.text.toLowerCase().replace(/[.,?!]/g, "")) ? 'selected-word' : ''}`}>
                    {word.text}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {showCaption && extraBubble && (
          <div className="subtitle-container" style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}>
            <div className="extra-cloud">
              <p>
                {extraBubble.words.map((word, index) => (
                  <span key={index} className={`word-span ${narrationHighlight && currentTime >= word.start && currentTime < word.end ? 'active-word' : ''}`}>
                    {word.text}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* --- Controls --- */}
        <div className="video-overlay" />
        <div className="controls-container">
          <div className="controlbbtn">
            <button onClick={handlePrevious} className="control-btn left-nav-btn">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={handleNext} className="control-btn right-nav-btn">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          <div className="controls-wrapper-new">
            <div className="controls-row">
              <div className="controls-group-left">
                <div className="settings-container">
                  <button onClick={() => setShowSettingsPopup(p => !p)} className="control-btn settings-btn" title="Settings">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </button>
                  {showSettingsPopup && (
                    <div className="settings-popup-container">
                      <div ref={settingsPopupRef} className="settings-popup">
                        <button onClick={() => setShowSettingsPopup(false)} className="close-popup-btn">×</button>
                        <h3>Settings</h3>
                        <div className="settings-options-grid">
                          <div className="setting-item"><span className="setting-label">Conversation Caption</span><label className="toggle-switch"><input type="checkbox" checked={showSubtitles} onChange={() => setShowSubtitles(p => !p)} /><span className="toggle-slider"></span></label></div>
                          <div className="setting-item"><span className="setting-label">Text Highlight</span><label className="toggle-switch"><input type="checkbox" checked={textHighlight} onChange={() => setTextHighlight(p => !p)} /><span className="toggle-slider"></span></label></div>
                          <div className="setting-item"><span className="setting-label">Narration</span><label className="toggle-switch"><input type="checkbox" checked={showCaption} onChange={() => setShowCaption(p => !p)} /><span className="toggle-slider"></span></label></div>
                          <div className="setting-item"><span className="setting-label">Narration Highlight</span><label className="toggle-switch"><input type="checkbox" checked={narrationHighlight} onChange={() => setNarrationHighlight(p => !p)} /><span className="toggle-slider"></span></label></div>
                          <div className="setting-item"><span className="setting-label">Auto Page Turn</span><label className="toggle-switch"><input type="checkbox" checked={autoPlayNext} onChange={() => setAutoPlayNext(p => !p)} /><span className="toggle-slider"></span></label></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="volume-control" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                  <button onClick={toggleMute} className="control-btn">{isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}</button>
                  {showVolumeSlider && <div className="volume-slider-container"><input type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="volume-slider" orient="vertical" /></div>}
                </div>
                <div className="speed-control-container">
                  <button onClick={() => setShowSpeedMenu(p => !p)} className="control-btn speed-btn" title="Playback Speed"><span className="speed-label">{playbackSpeed}x</span></button>
                  {showSpeedMenu && <ul className="speed-dropdown-list">{availableSpeeds.map(s => <li key={s} onClick={() => selectPlaybackSpeed(s)} className={playbackSpeed === s ? 'active-speed' : ''}>{s}x</li>)}</ul>}
                </div>
              </div>
              <div className="controls-group-center">
                <button onClick={togglePlay} className="control-btn play-btn">{isPlaying ? <Pause className="w-12 h-12" fill="white" /> : <Play className="w-12 h-12" fill="white" />}</button>
              </div>
              <div className="controls-group-right">
                <button onClick={toggleFullscreen} className="control-btn">{isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="progress-indicator-container">
          {videos.map((_, index) => <div key={index} className={`progress-dot ${index === currentVideo ? 'active' : ''}`} />)}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;

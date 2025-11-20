import { useEffect, useState, useRef } from "react";
import "./displayStory.scss";

interface SingleStory {
  storyImage: string | null;
  storyText: string | null;
  createdAt: string;
  name: string;
  profilePic: string;
  storyUserId:number
}

interface DisplayStoryProps {
  story: SingleStory[];
  onClose: () => void;
}

export default function DisplayStory({ story, onClose }: DisplayStoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const currentStory = story[currentIndex];

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  function startProgress() {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 40);
  }

  function handleNext() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    setCurrentIndex((prev) => {
      if (prev + 1 <= story.length - 1) {
        return prev + 1;
      }
      onClose();
      return prev;
    });
  }

  function handlePrev() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }

  

  return (
    <div className="display-story-overlay">
      <div className="story-background">
        {currentStory.storyImage && (
          <img
            src={`http://192.168.12.31:3000/uploads/${currentStory.storyImage}`}
            alt="bg"
          />
        )}
      </div>

      <div className="display-story-content">
        <button onClick={onClose} className="close-btn">×</button>

        <div className="progress-container">
          {story.map((_, i) => (
            <div
              key={i}
              className={`progress-bar ${i < currentIndex ? "completed" : ""}`}
            >
              {i === currentIndex && (
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="story-item">
          {currentStory.storyImage ? (
            <img
              className="main-story"
              src={`http://192.168.12.31:3000/uploads/${currentStory.storyImage}`}
              alt="story"
            />
          ) : (
            <span>{currentStory.storyText}</span>
          )}
        </div>

        <div className="tap-left" onClick={handlePrev}></div>
        <div className="tap-right" onClick={handleNext}></div>
      </div>
    </div>
  );
}
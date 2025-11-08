import { useState } from "react";
import BackgroundImage from "../assets/background.png";
import { scene } from "../config/scene";
import Start from "../assets/startbutton.png";
import HintBox from "@/components/HintBox";
import Timer from "@/components/GameTimer.jsx";
import hints from "@/data/hint";
import CheckAnswer from "./CheckAnswer";
import Finish from "./Finish";
import Correct from "./Correct";
import Wrong from "./Wrong";
import { submitScore } from "@/firebase/utils";
import { useMemo } from "react";

const PENALTY = 10;
const MAX_QUESTIONS = 10;

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function OceanScene() {
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [objectsFound, setObjectsFound] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);
  const [selectedObject, setSelectedObject] = useState("Ship");
  const [showResult, setShowResult] = useState(null); // "correct" | "wrong" | null
  const [showFinish, setShowFinish] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const shuffledHints = useMemo(() => shuffle(hints), []);

  const handleClick = (e, id, item) => {
    e.stopPropagation();
    setActiveId(id);
    setTimeout(() => setActiveId(null), 2000);
    setSelectedObject(item.name);
    setShowCheckAnswer(true);
  };

  const handleCheck = () => {
    const correctAnswer = shuffledHints[questionNumber].object;
    if (selectedObject === correctAnswer) {
      setObjectsFound((n) => n + 1);
      setShowResult("correct");
    } else {
      setWrongAnswers((n) => n + 1);
      setShowResult("wrong");
    }

    setShowCheckAnswer(false);
    setActiveId(null);
  };

  const handleNextQuestion = () => {
    if (questionNumber + 1 >= MAX_QUESTIONS) {
      setShowFinish(true);
      setShowResult(null);
      setGameActive(false);
      return;
    }

    setShowResult(null);
    setGameActive(true);
    setQuestionNumber((n) => n + 1);
  };

  const handleTryAgain = () => {
    setShowResult(null);
  };

  const handleStartClick = (e) => {
    e.stopPropagation();
    setGameActive(true);
    setShowStartButton(false);
  };

  const handlePopupClose = () => {
    setGameActive(false);
    setShowStartButton(true);
  };

  const handleSubmit = () => {
    submitScore(currentTime / 1000, wrongAnswers * PENALTY);
    alert("Game results submitted!");
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-bottom bg-no-repeat z-4 overflow-hidden"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {scene.map((item, i) => {
        const id = `object-${i}`;
        const isActive = activeId === id;
        const baseZ = item.zindex ?? 1;
        return (
          <img
            key={id}
            id={id}
            src={item.src}
            alt={item.name}
            className={`absolute object-hoverable transition-transform duration-200 ease-out ${
              isActive ? "object-active" : ""
            }`}
            onClick={(e) => handleClick(e, id, item)}
            style={{
              top: item.top,
              left: item.left,
              height: item.height,
              width: item.width,
              zIndex: isActive ? 2000 : baseZ,
              cursor: "pointer",
            }}
          />
        );
      })}

      {showStartButton && (
        <img
          src={Start}
          alt="Start"
          onClick={handleStartClick}
          className="absolute bottom-[10vh] left-[45%] w-[170px] h-auto z-3000 cursor-pointer"
        />
      )}

      {gameActive && !showFinish && (
        <>
          {showCheckAnswer && (
            <CheckAnswer
              object={selectedObject}
              setShowCheckAnswer={setShowCheckAnswer}
              onConfirm={handleCheck}
            />
          )}
          <HintBox
            hints={shuffledHints[questionNumber]?.hints || []}
            onClose={handlePopupClose}
          />
          <Timer
            onClose={handlePopupClose}
            objectsFound={objectsFound}
            bonusTime={wrongAnswers * PENALTY}
            questionNumber={questionNumber}
            onTimeUpdate={setCurrentTime}
          />

          {showResult === "correct" && (
            <Correct onNextQuestion={handleNextQuestion} />
          )}
          {showResult === "wrong" && (
            <Wrong
              onNextQuestion={handleNextQuestion}
              onTryAgain={handleTryAgain}
            />
          )}
        </>
      )}

      {showFinish && <Finish submit={handleSubmit} />}
    </div>
  );
}

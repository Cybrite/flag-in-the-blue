import { useEffect, useState } from "react";
import { logoutUser, submitScore } from "@/firebase/utils.js";
import OceanScene from "@/components/OceanScene";
import GameTimer from "@/components/GameTimer";
import HintBox from "@/components/HintBox"; // Main hint component
import CorrectPopup from "@/components/Correct";
import WrongPopup from "@/components/Wrong";
import FinishPopup from "@/components/finish";

function Game() {
  const [gameState, setGameState] = useState({
    objectsFound: 0,
    currentHintIndex: 0,
    showCorrect: false,
    showWrong: false,
    showFinish: false,
    timeElapsed: 0,
    penalties: 0,
  });

  function alreadyLoggedIn() {
    const userId = localStorage.getItem("uid");
    return !!userId;
  }

  // Handle when user clicks an object in OceanScene
  const handleObjectClick = (objectId, isCorrect) => {
    if (isCorrect) {
      setGameState((prev) => ({
        ...prev,
        objectsFound: prev.objectsFound + 1,
        showCorrect: true,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        penalties: prev.penalties + 10, // Add 10 second penalty
        showWrong: true,
      }));
    }
  };

  // Handle moving to next hint after correct answer
  const handleNextHint = () => {
    setGameState((prev) => {
      const nextIndex = prev.currentHintIndex + 1;
      const isLastHint = nextIndex >= 10; // Assuming 10 total objects

      return {
        ...prev,
        currentHintIndex: nextIndex,
        showCorrect: false,
        showFinish: isLastHint,
      };
    });
  };

  // Handle try again after wrong answer
  const handleTryAgain = () => {
    setGameState((prev) => ({
      ...prev,
      showWrong: false,
    }));
  };

  async function handleSubmit() {
    const success = await submitScore(
      gameState.timeElapsed,
      gameState.penalties
    );
    if (success) {
      setTimeout(() => {
        logoutUser();
        window.location.href = "/leaderboard";
      }, 2000);
    }
  }

  useEffect(() => {
    if (!alreadyLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);

  // Track time
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 10,
      }));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <OceanScene
        onObjectClick={handleObjectClick}
        currentHintIndex={gameState.currentHintIndex}
      />

      <GameTimer
        time={gameState.timeElapsed}
        penalties={gameState.penalties}
        objectsFound={gameState.objectsFound}
      />

      <HintBox currentIndex={gameState.currentHintIndex} />

      {gameState.showCorrect && (
        <CorrectPopup
          onNext={handleNextHint}
          isLastHint={gameState.currentHintIndex === 9}
        />
      )}

      {gameState.showWrong && <WrongPopup onTryAgain={handleTryAgain} />}

      {gameState.showFinish && (
        <FinishPopup
          onSubmit={handleSubmit}
          finalTime={gameState.timeElapsed}
          penalties={gameState.penalties}
        />
      )}
    </main>
  );
}

export default Game;

import { useState } from "react";
import popupBoxImg from "../assets/popupbox.png";
import nextHintImg from "../assets/nexthint.png";
import tryagain from "../assets/tryagain.png";

const jakartaFont = { fontFamily: '"Super Squad", sans-serif' };

export default function Wrong({ onNextQuestion, onTryAgain }) {
  const [isWrongOpen, setIsWrongOpen] = useState(true);

  const handleNextQuestion = () => {
    setIsWrongOpen(false);
    if (onNextQuestion) onNextQuestion();
  };

  const handleTryAgain = () => {
    setIsWrongOpen(false);
    if (onTryAgain) onTryAgain();
  };

  return (
    <>
      {isWrongOpen && (
        <div className="fixed inset-0 z-60">
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-[90%] max-w-2xl 
                       text-white text-center p-8 md:p-12 
                       flex flex-col items-center justify-center shadow-2xl z-70"
            style={{
              backgroundImage: `url(${popupBoxImg})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "rgba(30, 30, 50, 0.1)",
              ...jakartaFont,
            }}
          >
            <h2
              className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-red-500 mb-8"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                padding: "15px 30px",
                margin: "10px 0",
              }}
            >
              WRONG ANSWER!
            </h2>

            <div className="flex justify-center items-center mt-6 gap-8">
              <button
                onClick={handleTryAgain}
                style={{
                  backgroundImage: `url(${tryagain})`,
                  backgroundSize: "100% 100%",
                }}
                className="w-40 h-20 md:w-52 md:h-24 flex items-center justify-center 
                           bg-contain bg-no-repeat bg-center text-white font-extrabold 
                           text-2xl md:text-3xl hover:scale-110 transition-transform duration-200"
              />
              <button
                onClick={handleNextQuestion}
                style={{
                  backgroundImage: `url(${nextHintImg})`,
                  backgroundSize: "100% 100%",
                }}
                className="w-40 h-20 md:w-52 md:h-24 flex items-center justify-center 
                           bg-contain bg-no-repeat bg-center text-white font-extrabold 
                           text-2xl md:text-3xl hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

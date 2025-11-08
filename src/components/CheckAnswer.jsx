import { useEffect, useRef } from "react";
import popupBoxImg from "../assets/popupbox.png";
import checkBoxImg from "../assets/checkBox.png";

const jakartaFont = { fontFamily: '"Super Squad", sans-serif' };

const CheckAnswer = ({ object, setShowCheckAnswer, onConfirm }) => {
  const boxRef = useRef(null);

  const handleCheck = () => {
    setShowCheckAnswer(false);
    onConfirm();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowCheckAnswer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowCheckAnswer]);

  return (
    <div
      ref={boxRef}
      className="fixed bottom-[15vh]
        left-1/2 transform -translate-x-1/2 
        w-[95%] max-w-4xl bg-white/10
        text-white text-center p-12 md:p-16 
        flex flex-col items-center justify-center 
        z-50 rounded-4xl"
      style={{
        backgroundImage: `url(${popupBoxImg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(50, 30, 50, 0.1)",
        ...jakartaFont,
      }}
    >
      <p className="text-yellow-400 font-bold text-xl md:text-2xl mb-4 leading-relaxed max-w-3xl">
        CLICKED ON&nbsp;:
        <span className="text-white font-medium ml-3">{object}</span>
      </p>

      <img
        src={checkBoxImg}
        alt="Hint Button"
        onClick={handleCheck}
        className="cursor-pointer w-32 h-auto hover:scale-105 transition-transform"
      />
    </div>
  );
};

export default CheckAnswer;

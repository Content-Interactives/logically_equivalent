import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const LogicallyEquivalent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  
  const questions = [
    {
      id: 1,
      statement1: "If it rains, then the ground is wet.",
      statement2: "If the ground is not wet, then it did not rain.",
      options: ["Yes, they are logically equivalent", "No, they are not logically equivalent"],
      answer: 0,
      explanation: "This is the contrapositive (if not q, then not p) of the original statement (if p, then q), which is always logically equivalent."
    },
    {
      id: 2,
      statement1: "All birds can fly.",
      statement2: "If something can fly, then it is a bird.",
      options: ["Yes, they are logically equivalent", "No, they are not logically equivalent"],
      answer: 1,
      explanation: "The first statement is 'All A are B', the second is 'All B are A'. These are converses of each other, not logical equivalents."
    },
    {
      id: 3,
      statement1: "It is false that both the lights are on and the door is locked.",
      statement2: "The lights are off or the door is unlocked.",
      options: ["Yes, they are logically equivalent", "No, they are not logically equivalent"],
      answer: 0,
      explanation: "This follows De Morgan's Law: \"not (P and Q)\" ⟺ \"(not P) or (not Q)\""
    },
    {
      id: 4,
      statement1: "You can have cake or ice cream.",
      statement2: "You cannot have both cake and ice cream.",
      options: ["Yes, they are logically equivalent", "No, they are not logically equivalent"],
      answer: 1,
      explanation: "The first allows both options, while the second excludes having both. These are not logically equivalent."
    },
    {
      id: 5,
      statement1: "It's not the case that either I study or I pass the exam.",
      statement2: "I don't study and I don't pass the exam.",
      options: ["Yes, they are logically equivalent", "No, they are not logically equivalent"],
      answer: 0,
      explanation: "This follows De Morgan's Law: \"not (P or Q)\" ⟺ \"(not P) and (not Q)\""
    }
  ];
  
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    if (selectedOption === questions[currentQuestion].answer) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback("Incorrect. Try again!");
    }
    setIsChecked(true);
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback("");
      setIsChecked(false);
    } else {
      setCurrentQuestion(0);
      setSelectedOption(null);
      setFeedback("");
      setScore(0);
      setIsChecked(false);
    }
  };

  return (
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: rgb(250, 245, 255);
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Understanding Logical Equivalence</h2>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedOption(null);
                setFeedback("");
                setScore(0);
                setIsChecked(false);
              }}
              className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Practice Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Question {currentQuestion + 1}</h2>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`rounded-full transition-all duration-300 ${
                      num < currentQuestion || (num === 4 && currentQuestion === 4 && feedback.includes("Correct")) ? 'w-3 h-3 bg-[#008545]' : 
                      num === currentQuestion ? 'w-2 h-2 bg-[#5750E3] mt-0.5' : 
                      'w-3 h-3 bg-purple-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="font-medium text-sm">Statement 1: {questions[currentQuestion].statement1}</p>
              <p className="mt-2 font-medium text-sm">Statement 2: {questions[currentQuestion].statement2}</p>
              <p className="mt-2 font-semibold text-sm">Are these statements logically equivalent?</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isChecked || selectedOption !== questions[currentQuestion].answer) {
                      setSelectedOption(index);
                      setFeedback("");
                      setIsChecked(false);
                    }
                  }}
                  disabled={isChecked && selectedOption === questions[currentQuestion].answer}
                  className={`block w-full text-left p-3 rounded text-sm ${
                    selectedOption === index 
                      ? !isChecked
                        ? 'bg-[#5750E3]/10 border border-[#5750E3]'
                        : selectedOption === questions[currentQuestion].answer
                          ? 'bg-[#008545]/10 border border-[#008545]'
                          : 'bg-yellow-100 border border-yellow-500'
                      : isChecked && index === questions[currentQuestion].answer && selectedOption === questions[currentQuestion].answer
                        ? 'bg-[#008545]/10 border border-[#008545]'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                  } ${isChecked && selectedOption === questions[currentQuestion].answer ? 'cursor-default' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {feedback && (
              <div className={`p-4 rounded-lg mb-4 ${feedback.includes("Correct") ? "bg-[#008545]/10 border border-[#008545]" : "bg-yellow-50 border border-yellow-200"}`}>
                <p className={`font-medium text-sm ${feedback.includes("Correct") ? "text-[#008545]" : "text-yellow-800"}`}>
                  {feedback}
                </p>
                {selectedOption === questions[currentQuestion].answer && feedback.includes("Correct") && (
                  <p className="mt-2 text-gray-700 text-sm">
                    {questions[currentQuestion].explanation}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              {(!isChecked || selectedOption !== questions[currentQuestion].answer) && (
                <div className="glow-button simple-glow">
                  <Button
                    onClick={checkAnswer}
                    className="bg-[#00783E] hover:bg-[#006633] text-white text-sm px-4 py-2 rounded"
                  >
                    Check
                  </Button>
                </div>
              )}
              {(currentQuestion < questions.length - 1 || 
                (currentQuestion >= questions.length - 1 && feedback.includes("Correct"))
              ) && feedback.includes("Correct") && (
                <div className="glow-button simple-glow">
                  <Button
                    onClick={nextQuestion}
                    className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded"
                  >
                    {currentQuestion >= questions.length - 1
                      ? "Start Over" 
                      : "Next Question"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogicallyEquivalent;
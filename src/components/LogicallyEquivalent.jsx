import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const LogicallyEquivalent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
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
  
  const checkAnswer = (index) => {
    setSelectedOption(index);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback("");
    } else {
      // Reset quiz when "Start Over" is clicked
      setCurrentQuestion(0);
      setSelectedOption(null);
      setFeedback("");
      setScore(0);
    }
  };
  
  const getButtonText = () => {
    if (currentQuestion >= questions.length - 1) {
      return "Start Over";
    }
    
    if (selectedOption === questions[currentQuestion].answer) {
      return "Next Question";
    }
    
    return "Skip";
  };
  
  return (
    <div className="bg-gray-100 p-8 w-full overflow-auto">
      <Card className="w-full mx-auto shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg w-full">
          <h1 className="text-sky-900 text-2xl font-bold">Understanding Logical Equivalence</h1>
          <p className="text-sky-800">Learn when two statements always have the same truth value!</p>
        </div>
        
        <CardContent className="space-y-6 pt-6 w-full">
          {/* Definition Box */}
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What is Logical Equivalence?</h2>
            <p className="text-blue-600 mb-3">
              Two statements are <strong>logically equivalent</strong> if they always have the same truth value, no matter how you look at them. This means:
              <ul className="ml-6 mt-2 list-disc">
                <li>If one statement is <strong>true</strong>, the other is also <strong>true</strong>.</li>
                <li>If one statement is <strong>false</strong>, the other is also <strong>false</strong>.</li>
              </ul>
            </p>
            
            <h3 className="text-blue-800 font-semibold mt-4 mb-2">Common Logical Equivalence Laws:</h3>
            <ul className="text-blue-600 space-y-2">
              <li><strong>Contrapositive:</strong> "If P then Q" ⟺ "If not Q then not P"</li>
              <li><strong>Double Negation:</strong> "P" ⟺ "not (not P)"</li>
              <li><strong>De Morgan's Laws:</strong>
                <ul className="ml-4 mt-1">
                  <li>"not (P and Q)" ⟺ "(not P) or (not Q)"</li>
                  <li>"not (P or Q)" ⟺ "(not P) and (not Q)"</li>
                </ul>
              </li>
            </ul>
          </div>
          
          {/* Example Box */}
          <Card className="border border-gray-200">
            <CardContent className="space-y-4 pt-4 p-6">
              <h3 className="text-lg font-semibold mb-2">Examples</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Example 1: Logical Equivalence</p>
                  <p className="text-sm text-gray-600">Statement A: "If I study, then I will pass the exam."</p>
                  <p className="text-sm text-gray-600">Statement B: "If I do not pass the exam, then I did not study."</p>
                  <p className="mt-2 bg-blue-100 p-3 rounded text-blue-800">
                    These statements are logically equivalent because they always have the same truth value in all situations. Statement B is the "contrapositive" of Statement A, and a statement and its contrapositive are always equivalent.
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold">Example 2: Not Logically Equivalent</p>
                  <p className="text-sm text-gray-600">Statement A: "If I study, then I will pass the exam."</p>
                  <p className="text-sm text-gray-600">Statement B: "If I pass the exam, then I studied."</p>
                  <p className="mt-2 bg-red-100 p-3 rounded text-red-800">
                    These statements are NOT logically equivalent because there's a situation where they have different truth values: if someone doesn't study but still passes the exam, Statement A would be true but Statement B would be false.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Practice Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`rounded-full transition-all duration-300 ${
                      num < currentQuestion ? 'w-3 h-3 bg-green-500' : 
                      num === currentQuestion ? 'w-2 h-2 bg-purple-600 mt-0.5' : 
                      'w-3 h-3 bg-purple-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="font-medium">Statement 1: {questions[currentQuestion].statement1}</p>
              <p className="mt-2 font-medium">Statement 2: {questions[currentQuestion].statement2}</p>
              <p className="mt-2 font-semibold">Are these statements logically equivalent?</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(index)}
                  disabled={selectedOption === questions[currentQuestion].answer && index !== questions[currentQuestion].answer}
                  className={`block w-full text-left p-3 rounded ${
                    selectedOption === index 
                      ? selectedOption === questions[currentQuestion].answer
                        ? 'bg-green-100 border border-green-500'
                        : 'bg-red-100 border border-red-500'
                      : selectedOption === questions[currentQuestion].answer && index !== questions[currentQuestion].answer
                        ? 'bg-white border border-gray-200 pointer-events-none'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                  } ${selectedOption === questions[currentQuestion].answer && index !== questions[currentQuestion].answer ? 'opacity-50 cursor-default' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {selectedOption === questions[currentQuestion].answer && (
              <div className="p-4 rounded-lg mb-4 bg-green-50 border border-green-200">
                <p className="font-medium text-green-800">
                  Correct!
                </p>
                <p className="mt-2 text-gray-700">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            )}
            
            <div className="flex justify-end">
              {(currentQuestion < questions.length - 1 || 
                (currentQuestion >= questions.length - 1 && selectedOption === questions[currentQuestion].answer) ||
                (currentQuestion >= questions.length - 1 && feedback === "Incorrect")
              ) && (
                <Button
                  onClick={nextQuestion}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {getButtonText()}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding logical equivalence is essential for reasoning, mathematics, and computer science!
      </p>
    </div>
  );
};

export default LogicallyEquivalent;
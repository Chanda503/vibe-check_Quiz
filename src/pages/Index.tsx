
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizQuestions, calculateVibe, vibeResults } from "../data/quizData";
import QuizQuestion from "../components/QuizQuestion";
import ResultCard from "../components/ResultCard";
import ProgressBar from "../components/ProgressBar";
import { Computer } from "lucide-react";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [vibeResult, setVibeResult] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setStarted(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
      // Quiz complete - calculate results
      const result = calculateVibe(newAnswers);
      setVibeResult(result);
      setCompleted(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRetakeQuiz = () => {
    setStarted(true);
    setCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setVibeResult(null);
  };

  // Welcome/start screen
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-md w-full">
          <div className="vibe-card text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
                <Computer className="h-10 w-10" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="gradient-text">Vibe Check</span>
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Answer 5 quick questions and discover your true vibe. Are you chill, chaotic, creative, or analytical?
            </p>
            
            <Button 
              onClick={handleStartQuiz}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Start Quiz
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            No sign-up required. Results are sharable!
          </p>
        </div>
      </div>
    );
  }

  // Results screen
  if (completed && vibeResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Your Vibe Is...</h1>
          <ResultCard 
            result={vibeResults[vibeResult]} 
            onRetakeQuiz={handleRetakeQuiz}
          />
        </div>
      </div>
    );
  }

  // Quiz questions screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          <ProgressBar 
            currentQuestion={currentQuestionIndex + 1} 
            totalQuestions={quizQuestions.length} 
          />
        </div>
        
        <QuizQuestion 
          question={quizQuestions[currentQuestionIndex]} 
          selectedOption={selectedOption} 
          onSelectOption={handleSelectOption}
        />
        
        <Button 
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'See Result' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default Index;

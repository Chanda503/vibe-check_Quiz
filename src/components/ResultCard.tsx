
import React from "react";
import { VibeResult } from "../data/quizData";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  result: VibeResult;
  onRetakeQuiz: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onRetakeQuiz }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Vibe is: ${result.title}`,
        text: `I just took the Vibe Check quiz and I'm ${result.title}! ${result.emoji}\n\n${result.description}`,
        url: window.location.href,
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `My Vibe is: ${result.title} ${result.emoji}\n\n${result.description}\n\nTake the quiz at: ${window.location.href}`
      );
      alert("Result copied to clipboard! Share it with your friends!");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="vibe-card pulse-animation mb-6 text-center">
        <div className={`mx-auto mb-4 w-24 h-24 rounded-full flex items-center justify-center ${result.color} text-white text-4xl`}>
          {result.emoji}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
          {result.title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {result.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={onRetakeQuiz}
            className="w-full sm:w-auto"
          >
            Retake Quiz
          </Button>
          
          <Button 
            onClick={handleShare}
            className="w-full sm:w-auto"
          >
            Share Result
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

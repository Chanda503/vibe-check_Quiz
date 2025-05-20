
import React from "react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestion, 
  totalQuestions 
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-in-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

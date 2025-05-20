
import React from "react";
import { QuizQuestion as QuizQuestionType } from "../data/quizData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="vibe-card mb-6 transition-opacity ease-in duration-300 select-none">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`answer-option ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => onSelectOption(index)}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;

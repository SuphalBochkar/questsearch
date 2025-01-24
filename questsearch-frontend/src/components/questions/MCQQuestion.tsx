"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface MCQQuestionProps {
  options: Array<{ text: string; isCorrectAnswer: boolean }>;
}

export function MCQQuestion({ options }: MCQQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const correctOption = options.findIndex((opt) => opt.isCorrectAnswer);

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
    setIsCorrect(options[idx].isCorrectAnswer);
    if (options[idx].isCorrectAnswer) {
      setShowSolution(true);
    }
  };

  const getOptionStyle = (index: number, isCorrect: boolean) => {
    if (selectedOption === null) {
      return "bg-white/50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 border border-transparent";
    }

    if (selectedOption === index) {
      return isCorrect
        ? "bg-green-50 text-green-700 border-green-500 ring-1 ring-green-500"
        : "bg-red-50 text-red-700 border-red-500 ring-1 ring-red-500";
    }

    if (isCorrect && showSolution && isCorrect) {
      return "bg-green-50 text-green-700 border-green-500 ring-1 ring-green-500";
    }

    return "bg-white/50 text-gray-500 border border-transparent hover:bg-indigo-50 hover:text-indigo-600";
  };

  return (
    <div className="mt-4">
      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(idx)}
            disabled={isCorrect}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg
                     transition-all duration-200 border
                     ${getOptionStyle(idx, option.isCorrectAnswer)}`}
          >
            <span className="flex-1 text-left">{option.text}</span>
            {((selectedOption === idx && !option.isCorrectAnswer) ||
              (option.isCorrectAnswer && showSolution)) && (
              <span className="ml-3 flex-shrink-0">
                {option.isCorrectAnswer ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : selectedOption === idx ? (
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                ) : null}
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedOption !== null && (
        <div className="mt-4 space-y-2">
          <div
            className={`p-3 rounded-lg text-sm font-medium ${
              isCorrect
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {isCorrect
              ? "Correct! Well done! 🎉"
              : "Incorrect. Try another option! 💪"}
          </div>

          {!showSolution && !isCorrect && (
            <button
              onClick={() => setShowSolution(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-50 hover:bg-indigo-100
                       text-indigo-600 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <EyeIcon className="w-5 h-5" />
              Show Solution
            </button>
          )}

          {showSolution && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Answer: {options[correctOption].text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

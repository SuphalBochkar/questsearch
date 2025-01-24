"use client";

import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface AnagramQuestionProps {
  blocks: Array<{ text: string; showInOption: boolean; isAnswer: boolean }>;
  solution: string;
  anagramType: "WORD" | "SENTENCE";
}

export function AnagramQuestion({
  blocks,
  solution,
  anagramType,
}: AnagramQuestionProps) {
  const [selectedBlocks, setSelectedBlocks] = useState<
    Array<{ text: string; id: number }>
  >([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledBlocks, setShuffledBlocks] = useState(
    blocks.map((block, index) => ({ ...block, id: index }))
  );
  const [showSolution, setShowSolution] = useState(false);

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle blocks on component mount
  useEffect(() => {
    setShuffledBlocks(
      shuffleArray(blocks.map((block, index) => ({ ...block, id: index })))
    );
  }, [blocks]);

  const handleBlockClick = (text: string, id: number) => {
    setSelectedBlocks([...selectedBlocks, { text, id }]);
  };

  const checkAnswer = () => {
    const userAnswer = selectedBlocks
      .map((block) => block.text)
      .join(anagramType === "WORD" ? "" : " ")
      .trim();
    const normalizedUserAnswer = userAnswer.toLowerCase();
    const normalizedSolution = solution.toLowerCase();
    const isAnswerCorrect = normalizedUserAnswer === normalizedSolution;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    if (isAnswerCorrect) {
      setShowSolution(true);
    }
  };

  const resetAnswer = () => {
    setSelectedBlocks([]);
    setShowResult(false);
    setIsCorrect(false);
    setShowSolution(false);
    setShuffledBlocks(
      shuffleArray(blocks.map((block, index) => ({ ...block, id: index })))
    ); // Reshuffle blocks on reset
  };

  const getBlockStyle = (id: number) => {
    if (selectedBlocks.some((block) => block.id === id)) {
      return "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50";
    }
    return anagramType === "WORD"
      ? "bg-white hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer shadow-sm text-lg font-medium"
      : "bg-white hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer shadow-sm";
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Selected words display */}
      <div className="p-4 min-h-[60px] bg-white rounded-lg border border-gray-200 break-words">
        {selectedBlocks.length > 0 ? (
          <p className="text-gray-700 text-lg">
            {selectedBlocks
              .map((block) => block.text)
              .join(anagramType === "WORD" ? "" : " ")}
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Click on {anagramType === "WORD" ? "letters" : "words"} to form your
            answer...
          </p>
        )}
      </div>

      {/* Word blocks */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div
          className={`flex flex-wrap gap-3 ${
            anagramType === "WORD" ? "justify-center" : "justify-start"
          }`}
        >
          {shuffledBlocks
            .filter((block) => block.showInOption)
            .map((block) => (
              <button
                key={block.id}
                onClick={() => handleBlockClick(block.text, block.id)}
                disabled={selectedBlocks.some(
                  (selected) => selected.id === block.id
                )}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                       border border-gray-200 ${getBlockStyle(block.id)}`}
              >
                {block.text}
              </button>
            ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={checkAnswer}
          disabled={selectedBlocks.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600
                   text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Check Answer
        </button>
        <button
          onClick={resetAnswer}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100
                   text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200
                   text-sm font-medium"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Result message and solution */}
      {showResult && (
        <div className="space-y-3">
          <div
            className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2
                      ${
                        isCorrect
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
          >
            {isCorrect ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                Correct! Well done! 🎉
              </>
            ) : (
              <>
                <XCircleIcon className="w-5 h-5" />
                Not quite right. Try again! 💪
              </>
            )}
          </div>

          {!isCorrect && !showSolution && (
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
                Correct Answer: {solution}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

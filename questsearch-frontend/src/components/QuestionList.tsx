"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Pagination } from "./Pagination";
import { QuestionTypeFilter } from "./QuestionTypeFilter";
import { ItemsPerPage } from "./ItemsPerPage";
import { MCQQuestion } from "./questions/MCQQuestion";
import { AnagramQuestion } from "./questions/AnagramQuestion";
import { ReadAlongQuestion } from "./questions/ReadAlongQuestion";
import debounce from "lodash/debounce";
import SkeletonQuestion from "./questions/SkeletonQuestion";

export interface Question {
  id: string;
  type: "MCQ" | "ANAGRAM" | "READ_ALONG" | "CONTENT_ONLY" | "CONVERSATION";
  title: string;
  solution?: string;
  anagramType?: "WORD" | "SENTENCE" | "";
  siblingId: string;
  options?: {
    text: string;
    isCorrectAnswer: boolean;
  }[];
  blocks?: {
    text: string;
    showInOption: boolean;
    isAnswer: boolean;
  }[];
}

interface QuestionListProps {
  searchQuery: string;
}

export function QuestionList({ searchQuery }: QuestionListProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedType, setSelectedType] = useState("ALL");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchQuestions = useCallback(
    async (title: string, category: string, page: number, limit: number) => {
      setLoading(true);
      setError("");
    },
    []
  );

  const debouncedFetch = useMemo(
    () =>
      debounce(
        (searchQuery: string, type: string, page: number, limit: number) => {
          fetchQuestions(searchQuery, type, page, limit);
        },
        300
      ),
    [fetchQuestions]
  );

  useEffect(() => {
    debouncedFetch(searchQuery, selectedType, currentPage, itemsPerPage);
  }, [searchQuery, selectedType, currentPage, itemsPerPage, debouncedFetch]);

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const getTypeColor = (type: Question["type"]) => {
    switch (type) {
      case "MCQ":
        return "bg-blue-100 text-blue-800 ring-blue-600/20";
      case "ANAGRAM":
        return "bg-purple-100 text-purple-800 ring-purple-600/20";
      case "READ_ALONG":
        return "bg-green-100 text-green-800 ring-green-600/20";
      case "CONTENT_ONLY":
        return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
      case "CONVERSATION":
        return "bg-pink-100 text-pink-800 ring-pink-600/20";
      default:
        return "bg-gray-100 text-gray-800 ring-gray-600/20";
    }
  };

  if (loading) {
    <SkeletonQuestion />;
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (!questions || questions.length === 0) {
    return;
  }
  return (
    <div>
      {/* Filter and items per page controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <QuestionTypeFilter
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
        <ItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="group bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/10 p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {question.title}
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset transition-all duration-300 ${getTypeColor(
                  question.type
                )}`}
              >
                {question.type}
              </span>
            </div>

            {/* Render question based on type */}
            {question.type === "MCQ" && question.options && (
              <MCQQuestion options={question.options} />
            )}

            {question.type === "ANAGRAM" && (
              <div className="space-y-3">
                {question.anagramType && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 ring-1 ring-gray-200">
                      {question.anagramType}
                    </span>
                  </div>
                )}
                {question.blocks &&
                  question.solution &&
                  question.anagramType && (
                    <AnagramQuestion
                      blocks={question.blocks}
                      solution={question.solution}
                      anagramType={question.anagramType}
                    />
                  )}
              </div>
            )}

            {question.type === "READ_ALONG" && (
              <ReadAlongQuestion title={question.title} />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

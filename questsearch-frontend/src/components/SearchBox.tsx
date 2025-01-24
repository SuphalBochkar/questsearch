"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-purple-100/30
                    rounded-2xl transition-opacity ${
                      isFocused ? "opacity-100" : "opacity-0"
                    }`}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className={`h-5 w-5 transition-colors ${
                isFocused ? "text-indigo-600" : "text-gray-400"
              }`}
              aria-hidden="true"
            />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (value === "") onSearch("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-28 py-4 bg-white/90 backdrop-blur-md border
                     border-gray-200/80 rounded-2xl outline-none text-gray-700
                     placeholder:text-gray-400 focus:border-indigo-300
                     focus:ring-2 focus:ring-indigo-200/50 transition-all duration-300
                     shadow-sm hover:shadow-md"
            placeholder="Search questions by title or type..."
            aria-label="Search questions"
          />

          <button
            type="submit"
            className={`absolute right-2 top-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl
                      font-medium transition-all duration-300 flex items-center gap-1.5
                      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                      focus:ring-offset-2 ${
                        query ? "translate-x-0" : "translate-x-2 opacity-0"
                      }`}
            aria-label="Perform search"
          >
            <span className="hidden sm:inline">Search</span>
            <MagnifyingGlassIcon className="h-4 w-4 sm:hidden" />
          </button>
        </div>
      </div>

      {query && (
        <div className="mt-3 ml-4 text-sm text-gray-500 animate-fade-in">
          Press <kbd className="px-1.5 py-1 bg-gray-100 rounded-md">Enter</kbd>{" "}
          to search
          <span className="hidden sm:inline"> for &quot;{query}&quot;</span>
        </div>
      )}
    </form>
  );
}

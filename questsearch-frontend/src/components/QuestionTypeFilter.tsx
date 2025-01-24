interface QuestionTypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function QuestionTypeFilter({
  selectedType,
  onTypeChange,
}: QuestionTypeFilterProps) {
  const types = [
    "ALL",
    "MCQ",
    "ANAGRAM",
    "READ_ALONG",
    "CONTENT_ONLY",
    "CONVERSATION",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      selectedType === type
                        ? "bg-indigo-600 text-white"
                        : "bg-white/80 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    } backdrop-blur-md border border-white/30`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

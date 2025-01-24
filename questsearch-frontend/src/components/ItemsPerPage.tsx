interface ItemsPerPageProps {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

export function ItemsPerPage({
  itemsPerPage,
  onItemsPerPageChange,
}: ItemsPerPageProps) {
  const options = [10, 20, 50, 100];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Items per page:</span>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onItemsPerPageChange(option)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        itemsPerPage === option
                          ? "bg-indigo-600 text-white"
                          : "bg-white/80 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      } backdrop-blur-md border border-white/30`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

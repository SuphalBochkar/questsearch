"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  itemsPerPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalCount);
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  const getVisiblePages = () => {
    const visiblePages = new Set<number | string>([1, totalPages]);
    const lowerBound = Math.max(2, currentPage - 2);
    const upperBound = Math.min(totalPages - 1, currentPage + 2);
    for (let i = lowerBound; i <= upperBound; i++) visiblePages.add(i);
    const sortedPages = Array.from(visiblePages).sort(
      (a, b) => Number(a) - Number(b)
    );
    const pagesWithDots: (number | string)[] = [];
    sortedPages.forEach((page, index) => {
      if (index > 0 && Number(page) - Number(sortedPages[index - 1]) > 1)
        pagesWithDots.push("...");
      pagesWithDots.push(page);
    });
    return pagesWithDots;
  };

  if (totalCount === 0 || totalPages === 0) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                   bg-white/50 text-gray-700 hover:bg-indigo-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                   bg-white/50 text-gray-700 hover:bg-indigo-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalCount.toLocaleString()}</span>{" "}
            results
          </p>
        </div>

        <nav className="inline-flex -space-x-px rounded-md shadow-sm bg-white/50">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-indigo-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {getVisiblePages().map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium
                ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }
                ${typeof page !== "number" ? "cursor-default" : ""}`}
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-indigo-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}

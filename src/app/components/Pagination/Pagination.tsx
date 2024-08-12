import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 bg-gray-800 p-3 text-white">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded bg-gray-600 px-4 py-2 text-sm hover:bg-gray-500 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm font-bold">{currentPage}</span>
      <span className="text-sm font-bold">/ {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded bg-gray-600 px-4 py-2 text-sm hover:bg-gray-500 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
  loading = false,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev || loading}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <div className="flex space-x-1">
        {currentPage > 3 && totalPages > 5 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              disabled={loading}
              className="w-10 h-10 flex items-center justify-center text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              1
            </button>
            {currentPage > 4 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                ...
              </span>
            )}
          </>
        )}
        
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={`w-10 h-10 flex items-center justify-center text-sm border rounded-lg transition-colors duration-200 ${
              page === currentPage
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={loading}
              className="w-10 h-10 flex items-center justify-center text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || loading}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
"use client";

import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      {/* << 버튼 - 첫 번째 페이지로 이동 */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
        {"<<"}
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
        {"<"}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`btn btn-sm mx-1 ${pageNumber === currentPage ? "btn-active" : ""}`}
        >
          {pageNumber}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-sm mx-1">
        {">"}
      </button>
      {/* >> 버튼 - 마지막 페이지로 이동 */}
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="btn btn-sm mx-1">
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

"use client";

import { useState } from "react";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
        {"<"}
      </button>
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm mx-1">
          {"<<"}
        </button>
      )}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + Math.max(currentPage - 2, 1)).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`btn btn-sm mx-1 ${pageNumber === currentPage ? "btn-active" : ""}`}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm mx-1">
          {">>"}
        </button>
      )}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-sm mx-1">
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

"use client";

import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  //todo: 페이지네이션 백엔드에서 처리해야함
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = 5; // 보여줄 페이지 수

  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // 페이지 수가 5보다 적을 경우 조정
  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="flex justify-center mt-4">
      {/* << 버튼 - 첫 번째 페이지로 이동 */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
        {"<<"}
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
        {"<"}
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
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

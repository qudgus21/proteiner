"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="flex">
      <div className={`w-64 bg-gray-800 text-white ${menuOpen ? "block" : "hidden"} lg:block`}>
        <div className="p-4">
          <button className="btn btn-primary w-full mb-4" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "접기" : "펼치기"}
          </button>
          <ul className="menu">
            <li>
              <Link href="/admin/spreadsheet" className="menu-item">
                스프레드시트 페이지
              </Link>
            </li>
            <li>
              <Link href="/admin/add-product" className="menu-item">
                상품 등록 페이지
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="menu-item">
                상품 리스트 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <div className={`w-64 bg-blue-300 text-white block lg:block min-w-[210px]`}>
        <div className="p-4">
          <ul className="menu font-bold text-[15px] gap-[10px]">
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
            <li>
              <Link href="/admin/spreadsheet" className="menu-item">
                스프레드시트 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-6 h-[100vh] overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminLayout;

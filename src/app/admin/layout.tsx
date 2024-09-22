import React from "react";
import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="flex h-[100vh]">
      <div className={`w-64 bg-blue-400 text-white block lg:block min-w-[210px]`}>
        <nav className="p-4">
          <ul className="menu font-bold text-[15px] gap-[10px]">
            <li>
              <Link href="/admin/product/list" className="menu-item">
                상품 목록
              </Link>
            </li>
            <li>
              <Link href="/admin/product/add" className="menu-item">
                상품 등록
              </Link>
            </li>
            <li>
              <Link href="/admin/spreadsheet" className="menu-item">
                스프레드시트
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6 h-[100vh] overflow-y-scroll">{children}</div>
    </section>
  );
};

export default AdminLayout;

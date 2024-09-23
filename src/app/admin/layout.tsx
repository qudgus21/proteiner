import React from "react";
import Link from "next/link";
import Image from "next/image";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="flex h-[100vh]">
      <div className={`w-64 bg-blue-400 text-white block lg:block min-w-[210px]`}>
        <nav className="p-4 flex flex-col justify-between h-[100%]">
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
          <div className="flex justify-center mb-20 cursor-pointer">
            <Image src="/images/icon.png" alt="Icon" width={150} height={150} />
          </div>
        </nav>
      </div>

      <div className="flex-1 p-6 h-[100vh] overflow-y-scroll">{children}</div>
    </section>
  );
};

export default AdminLayout;

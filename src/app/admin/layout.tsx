"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLoadingStore, useProductStore } from "@/stores";
import { LoadingSpinner } from "@/components";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, setLoading } = useLoadingStore();
  const { initialize } = useProductStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await initialize();
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

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

      <div className="flex-1 p-6 h-[100vh] overflow-y-scroll">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <LoadingSpinner />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default AdminLayout;

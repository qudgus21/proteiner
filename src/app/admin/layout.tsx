"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authInit, authLoading, user, signOut } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    authInit();
  }, [authInit]);

  const handleLogout = async () => {
    await signOut(() => {
      router.push("/admin/signin");
    });
  };

  return (
    <>
      {!authLoading && (
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
          {/* 로그아웃 버튼 */}
          {user && (
            <button onClick={handleLogout} className="cursor-pointer absolute top-4 right-4 btn btn-danger !z-50">
              로그아웃
            </button>
          )}
          <div className="flex-1 h-[100vh] overflow-y-scroll">{children}</div>
        </section>
      )}
    </>
  );
};

export default AdminLayout;

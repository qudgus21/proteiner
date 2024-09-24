"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { authLoading, user } = useAuthStore();

  useEffect(() => {
    if (authLoading) return;

    const url = user ? "/admin/product/list" : "/admin/signin";
    router.push(url);
  }, [authLoading, user]);

  return <></>;
};

export default AdminPage;

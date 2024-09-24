import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectUrl?: string;
}

const AuthGuard = ({ children, redirectUrl = "/" }: AuthGuardProps) => {
  const { user, authLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user && !authLoading) {
      //todo: 로그아웃 했을 때 alert뜨는 이슈
      alert("로그인이 필요합니다.");
      router.push(redirectUrl);
    }
  }, [user, router, authLoading, redirectUrl]);

  return user ? <>{children}</> : null;
};

export default AuthGuard;

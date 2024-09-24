//todo: 보류 (훅 방식은 직관적이지않은것같음)
// app/hooks/useAuth.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores";
import Cookies from "js-cookie";

interface AuthOptions {
  redirectUrl?: string; // 비로그인 시 리다이렉트할 URL
}

const useAuth = (options?: AuthOptions) => {
  const defaultRedirectPath = "/";

  const router = useRouter();
  const { isLoggedIn, setUser } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) return;

    const proteinerToken = Cookies.get("proteiner_token");

    if (proteinerToken) {
    } else {
      router.push(options?.redirectUrl || defaultRedirectPath);
    }

    // if (!isLoggedIn) {
    //   if (proteinerToken) {
    //     // 쿠키가 있는 경우 검증 API 호출
    //     fetch("/api/auth/auto-login", {
    //       method: "GET",
    //       credentials: "include", // 쿠키 포함
    //     })
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error("Not authenticated");
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         if (data.user) {
    //           setUser(data.user); // 사용자 정보를 Zustand에 저장
    //         } else {
    //           router.push(redirectUrl); // 사용자 정보가 없으면 지정된 리다이렉트 경로로 이동
    //         }
    //       })
    //       .catch(() => {
    //         router.push(redirectUrl); // 에러 발생 시 지정된 리다이렉트 경로로 이동
    //       });
    //   } else {
    //     // 쿠키도 없는 경우
    //     router.push(redirectUrl); // 로그인 페이지로 이동
    //   }
    // }
  }, []); // redirectUrl을 의존성 배열에 추가
};

export default useAuth;

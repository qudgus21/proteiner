"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { signIn } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signIn(email, password, () => {
        router.push("/admin/product/list");
      });
    } catch (error) {
      alert("로그인 중 에러가 발생했습니다");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">이메일</span>
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">비밀번호</span>
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
          </div>{" "}
          <button type="submit" className="btn btn-primary w-full">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

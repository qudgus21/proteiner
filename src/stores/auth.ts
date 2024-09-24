// stores/authStore.ts
import { create } from "zustand";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs";

interface AuthState {
  user: User | null;
  authInit: () => void;
  authLoading: boolean; // 로딩 상태 추가
  signUp: (email: string, password: string, callback?: () => void) => Promise<void>;
  signIn: (email: string, password: string, callback?: () => void) => Promise<void>;
  signOut: (callback?: () => void) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authLoading: true, // 초기 로딩 상태를 true로 설정

  // 사용자 인증 상태를 초기화
  authInit: () => {
    // Firebase의 인증 상태를 구독
    onAuthStateChanged(auth, (user) => {
      set({ user, authLoading: false });
    });
  },

  // 회원가입
  signUp: async (email, password, callback?) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
      if (callback) callback();
    } catch (error: any) {
      console.error("회원가입 실패:", error.message);
    }
  },

  // 로그인
  signIn: async (email, password, callback?) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
      if (callback) callback();
    } catch (error: any) {
      console.error("로그인 실패:", error.message);
    }
  },

  // 로그아웃
  signOut: async (callback?) => {
    try {
      await signOut(auth);
      set({ user: null });
      if (callback) callback();
    } catch (error: any) {
      console.error("로그아웃 실패:", error.message);
    }
  },
}));

export default useAuthStore;

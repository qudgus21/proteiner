import { create } from "zustand";

const useLoadingStore = create<{ loading: boolean; setLoading: (status: boolean) => void }>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useLoadingStore;

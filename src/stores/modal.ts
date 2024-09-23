import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  closeCallback?: () => void; // 추가된 부분
  openModal: (title: string, content: React.ReactNode, callback?: () => void) => void; // 변경된 부분
  closeModal: (callback?: () => void) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  closeCallback: undefined,
  openModal: (title, content, callback) => {
    set({ isOpen: true, title, content, closeCallback: callback });
  },
  closeModal: (callback) => {
    set({ isOpen: false, title: "", content: null, closeCallback: callback });
    if (callback) callback();
  },
}));

export default useModalStore;

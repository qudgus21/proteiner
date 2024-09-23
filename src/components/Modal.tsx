import React from "react";
import useModalStore from "@/stores/modal";

const Modal: React.FC = () => {
  const { isOpen, title, content, closeModal, closeCallback } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="modal modal-open my_modal_2">
      <div className="modal-box">
        <h2 className="font-bold text-lg">{title}</h2>
        <div>{content}</div>
        <div className="modal-action">
          <button className="btn" onClick={() => closeModal(closeCallback)}>
            확인
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
    </div>
  );
};

export default Modal;

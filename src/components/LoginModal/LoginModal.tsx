import React from "react";
import style from "./LoginModal.module.css";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.overlay} onClick={handleOutsideClick}>
      <div className={style.wrapper}>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          LoginModal
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

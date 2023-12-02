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
          <h1 className={style.h1}>간편하게 시작해보세요</h1>
          <div className={`${style.login_wrapper} ${style.kakao_bg}`}>
            <p>카카오 로그인</p>
          </div>
          <div className={`${style.login_wrapper} ${style.github_bg}`}>
            <p className={style.white}>GitHub 로그인</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

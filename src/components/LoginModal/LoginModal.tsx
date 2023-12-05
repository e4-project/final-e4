import React, { useEffect, useState } from "react";
import style from "./LoginModal.module.css";
import KaKaoLoginBtn from "./KaKaoLoginBtn";
import GithubLoginBtn from "./GithubLoginBtn";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => setSession(data.session))
      .catch((error) => console.error("Error:", error));
  }, []);
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
          {session && <p>Session: {JSON.stringify(session)}</p>}
          <KaKaoLoginBtn />
          <GithubLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

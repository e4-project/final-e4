import React, { useEffect, useState } from "react";
import style from "./LoginModal.module.css";
import KaKaoLoginBtn from "./KaKaoLoginBtn";
import GithubLoginBtn from "./GithubLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";

// LoginModalProps 인터페이스를 정의 인터페이스는 onClose 함수를 프로퍼티로 가짐
interface LoginModalProps {
  onClose: () => void;
}

// LoginModal 컴포넌트를 정의 컴포넌트는 LoginModalProps를 프로퍼티로 받음
const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [session, setSession] = useState(null); // 세션 상태를 관리

  // 컴포넌트가 마운트될 때 세션 데이터를 가져옴
  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => setSession(data.session))
      .catch((error) => console.error("Error:", error));
  }, []);

  // 모달 외부를 클릭하면 모달 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // LoginModal 컴포넌트를 렌더링
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
          <GoogleLoginBtn />
          <GithubLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

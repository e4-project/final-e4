"use client";
import { signIn } from "next-auth/react";
import style from "./LoginModal.module.css";
export default function LoginBtn() {
  return (
    <button
      onClick={() => signIn("kakao")}
      className={`${style.login_wrapper} ${style.kakao_bg}`}
    >
      <p>카카오 로그인</p>
    </button>
  );
}

"use client";
import { signIn } from "next-auth/react";
import style from "./LoginModal.module.css";
export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
      className={`${style.login_wrapper} ${style.github_bg}`}
    >
      <p className={style.white}>GitHub 로그인</p>
    </button>
  );
}

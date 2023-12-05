"use client";
import { signIn } from "next-auth/react";
import style from "./LoginModal.module.css";
export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signIn("google");
      }}
      className={`${style.login_wrapper} ${style.google_bg}`}
    >
      <p className={style.white}>Google 로그인</p>
    </button>
  );
}

"use client";

import React, { useState, FormEvent } from "react";
import style from "./Mypageview.module.css";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
const Mypageview = () => {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState<string>(""); // name 상태 변수 추가
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [blankName, setBlankName] = useState(false);
  const router = useRouter();
  const [change, setChange] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true);
    setName(e.target.value);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blankName) {
      fetch("/api/upload", {
        method: "POST",
        // 세션 이메일도 함께 전송
        body: JSON.stringify({ name: name, email: session?.user?.email }),
      }).then((res) => {
        if (res.status === 200) {
          if (status === "authenticated") update({ name });
          window.alert("변경되었습니다.");
          router.refresh();
          router.push("/");
        }
      });
    }
  };
  return (
    <form onSubmit={onSubmit} action="/api/upload" method="POST">
      <div className={style.wrapper}>
        <div className={style.profile_container}>
          <div className={style.profile_img}>
            {session && session.user && session.user.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className={style.profile_image}
              />
            )}
          </div>

          <input
            className={style.input_text}
            type="text"
            defaultValue={session?.user?.name || ""}
            onChange={(e) => setName(e.target.value)} // 입력 필드에서 이름 업데이트
          />
          <button className={style.save_btn} type="submit">
            수정 사항 저장
          </button>
        </div>
      </div>
    </form>
  );
};

export default Mypageview;

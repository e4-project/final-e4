"use client";

import React, { useState, FormEvent } from "react";
import style from "./Mypageview.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadImg2 } from "@/utils/uploadImg2";
import Goal from "./Goal";

const Mypageview = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [name, setName] = useState<string>(session?.user?.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [ImgSrc, setImgSrc] = useState<string | { secure_url: string }>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      const fileUrl = await uploadImg2(file);
      setFile(file);
      setImgSrc(fileUrl);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append(
      "data",
      JSON.stringify({
        name: name,
        email: session?.user?.email || "",
        imgSrc: ImgSrc,
      })
    );

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const errorData = await res.json();
      window.alert("중복된 닉네임 입니다."); // 서버에서 전달받은 에러 메시지를 사용자에게 표시
      return;
    }
    const { fileUrl } = await res.json();

    if (status === "authenticated") {
      update({ user: { ...session.user, image: fileUrl } });
    }
    window.alert("변경되었습니다.");
    router.push("/");
  };

  const handleWithdrawal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmation = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmation) {
      const res = await fetch("/api/upload/withdrawal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }), // userEmail은 사용자의 이메일을 담고 있는 변수입니다.
      });
      if (res.ok) {
        // 로그아웃 처리
        window.alert("탈퇴 처리되었습니다. 이용해 주셔서 감사합니다.");
        signOut({ callbackUrl: "/intropage" });
      } else {
        window.alert("탈퇴 처리에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="/api/upload" method="POST">
        <div className={style.wrapper}>
          <div className={style.profile_container}>
            <div className={style.profile_img}>
              {ImgSrc && (
                <img
                  src={typeof ImgSrc === "string" ? ImgSrc : ImgSrc.secure_url}
                  alt="프로필 미리보기"
                  className={style.profile_image}
                />
              )}
              {session && session.user && session.user.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className={style.profile_image}
                />
              )}
            </div>

            <label className={style.img_edit_btn} htmlFor="inputFile">
              프로필 사진 변경
            </label>
            <input
              style={{ display: "none" }}
              id="inputFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange} // 이미지 선택 필드에서 이미지 업데이트
            />

            <input
              className={style.input_text}
              type="text"
              defaultValue={session?.user?.name || ""}
              onChange={onChangeName}
            />

            <button className={style.save_btn} type="submit">
              저장
            </button>
            <button
              className={style.withdrawal_btn}
              onClick={handleWithdrawal}
              type="submit"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </form>
      <Goal></Goal>
    </div>
  );
};

export default Mypageview;

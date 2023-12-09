"use client";

import React, { useState, FormEvent } from "react";
import style from "./Mypageview.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadImg2 } from "@/utils/uploadImg2";
import axios from "axios";

const Mypageview = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [ImgSrc, setImgSrc] = useState("");

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
    const { fileUrl } = await res.json();

    if (status === "authenticated") {
      update({ user: { ...session.user, image: fileUrl } });
    }
    window.alert("변경되었습니다.");
    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit} action="/api/upload" method="POST">
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
            onChange={onChangeName}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // 이미지 선택 필드에서 이미지 업데이트
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

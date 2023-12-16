"use client";
import React, { useState, FormEvent } from "react";
import style from "./Hellopageview.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadImg2 } from "@/utils/uploadImg2";

const Hellopageview = () => {
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

    const res = await fetch("/api/duplicatename/haschangedname", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      window.alert("중복된 닉네임 입니다."); // 서버에서 전달받은 에러 메시지를 사용자에게 표시
      return;
    }

    const { fileUrl } = await res.json();

    if (status === "authenticated") {
      update({ user: { ...session.user, image: fileUrl } });
    }
    window.alert("환영합니다.");
    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit} action="/api/upload" method="POST">
      <div className={style.wrapper}>
        <div className={style.profile_container}>
          <div className={style.h3}>
            <h3>안녕하세요!</h3>
            <h3>이름과 프로필 사진을 설정해주세요.</h3>
          </div>
          <div>
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
        </div>
      </div>
    </form>
  );
};

export default Hellopageview;

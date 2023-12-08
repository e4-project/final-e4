"use client";

import React, { useState } from "react";
import style from "./Mypageview.module.css";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";

const mypageview = () => {
  const { data: session } = useSession();

  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const handleUploadSuccess = (result: any) => {
    setSelectedFileUrl(result.info.url);
    console.log("Uploaded image URL:", result.info.url);
  };
  const handleSaveChanges = async (event: React.MouseEvent) => {
    event.preventDefault(); // 페이지 새로고침 방지

    if (!selectedFileUrl) {
      alert("Please upload a file");
      return;
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ imageUrl: selectedFileUrl }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // 페이지를 새로고침하거나 업데이트된 사용자 정보를 가져와서 화면에 반영
    }
  };
  return (
    <form action="">
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
          <CldUploadButton
            uploadPreset="oqdugyzh"
            onSuccess={handleUploadSuccess}
          />

          <input
            className={style.input_text}
            type="text"
            defaultValue={session?.user?.name || ""}
          />
          <button className={style.save_btn} onClick={handleSaveChanges}>
            수정 사항 저장
          </button>
        </div>
      </div>
    </form>
  );
};

export default mypageview;

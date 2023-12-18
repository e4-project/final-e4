import { useState } from "react";
import style from "./Goal.module.css";
import { useSession } from "next-auth/react";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Goal = () => {
  const [checkInStatus, setCheckInStatus] = useState("");
  const { data: session } = useSession();

  const handleCheckIn = () => {
    const currentTime = new Date()
      .toLocaleString("en-GB", { timeZone: "Asia/Seoul", hour12: false })
      .replace(/\/|,|:/g, "-")
      .split(" ")
      .join("T");

    fetch("api/mypage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.email, // 사용자 ID
        checkInTime: currentTime, // 출석체크 시간
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCheckInStatus(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.flex}>
        <h2>안녕하세요</h2>
        <div>
          <button onClick={handleCheckIn}>출석체크</button>
          {checkInStatus && <p>{checkInStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Goal;

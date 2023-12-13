"use client";
import React, { useState, useEffect } from "react";
import style from "./study.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";

const LeftContainer = () => {
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const { id } = useParams<{ id: string }>() || {};

  useEffect(() => {
    if (pathname) {
      const fetchData = async () => {
        try {
          const result = await fetch(`/api/study/studyinfo/${id}`);
          console.log(result);

          const data = await result.json();
          console.log(data);

          if (data) {
            setData({
              material: data.material,
              duration: data.duration,
              applicants: data.applicants,
              materialUrl: data.materialUrl,
            });
          }
        } catch (error) {
          console.error("스터디 정보를 가져오는 중 에러 발생", error);
        }
      };

      fetchData();
    }
  }, [pathname, id]);

  return (
    <div className={style.left_container}>
      <div className={style.left_info}>
        <h4>함께 공부할 강의</h4>
        <p>{data?.material}</p>
        <div className={style.study_mini_info}>
          <p className={style.study_room}>
            스터디룸
            <a href={data?.materialUrl} target="_blank">
              <button className={style.Entrance}>
                <span>드과자</span>
                <span>입장하기</span>
              </button>
            </a>
          </p>
          <p>
            스터디 기간 <span>{data?.duration}</span>
          </p>
          <p>
            스터디 멤버 <span>{data?.applicants}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

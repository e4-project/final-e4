"use client";
import React, { useState, useEffect } from "react";
import style from "./study.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import Avatar from "@/components/common/Avatar";

const StyledImg = {
  display: "inline-block",
  borderRadius: "5px",
  padding: "2px",
};

const LeftContainer = () => {
  const pathname = usePathname(); // useRouter 쓰면 에러가 됨 그래서 usePathname 사용
  const [data, setData] = useState<any>(null);
  const { id } = useParams<{ id: string }>() || {};
  useEffect(() => {
    if (pathname) {
      const fetchData = async () => {
        try {
          // 데이터 가져옴
          const result = await fetch(`/api/study/studyinfo/${id}`);
          console.log(result);

          const data = await result.json();
          console.log(data);

          // 상태 업데이트
          if (data) {
            setData({
              material: data.material,
              duration: data.duration,
              applicants: data.applicants,
              leader: data.leader,
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

  const MemberList = ({
    user,
  }: {
    user: { _id: string; image: string; name: string };
  }) => (
    <div
      key={user?._id}
      style={{
        display: "flex",
        gap: 9,
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <Avatar src={user?.image} alt="pimg" style={StyledImg} />
      <p key={user?._id}>{user?.name}</p>
    </div>
  );
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
          <p style={{ marginBottom: 20 }}>스터디 멤버</p>
          {data && (
            <>
              <div className={style.study_leader}>
                <MemberList user={data.leader} />
                <div
                  style={{
                    color: "#748ffc",
                    background:
                      "linear-gradient(0deg, #f5f7ff 0%, #f5f7ff 100%)",
                    width: "fit-content",
                    borderRadius: 4,
                    padding: 5,
                  }}
                >
                  <span>리더</span>
                </div>
              </div>
              <div>
                {data?.applicants?.map((member: any) => (
                  <MemberList key={member._id} user={member} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

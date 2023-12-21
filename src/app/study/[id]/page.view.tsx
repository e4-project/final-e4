"use client";
import React, { useState, useEffect } from "react";
import style from "./study.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import Avatar from "@/components/common/Avatar";

const StyledImg = {
  // display: "inline-block",
  borderRadius: "5px",
};

const LeftContainer = () => {
  const pathname = usePathname(); // useRouter 쓰면 에러가 됨 그래서 usePathname 사용
  const [data, setData] = useState<any>(null);
  const { id } = useParams<{ id: string }>() || {};
  console.log({data})
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
      className={style.member_list}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        fontWeight: "600",
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
          <li className={style.list}>
            <img src="/icons/icon_zoom.svg" alt="" />
            <span>스터디룸</span>
            <a href={data?.materialUrl} target='_blank'>
              <button className={style.Entrance}>
                <span>드과자</span>
                <span>입장하기</span>
              </button>
            </a>
            {/* <button>🖍 줌 링크 어케 넣는데</button> */}
          </li>
          <li className={style.list}>
            <img src="/icons/icon_calendar.svg" alt="" />
            <span>스터디 기간</span>
            <span className={style.font_bold} style={{ paddingLeft: '12px', color: "#4E515B" }}>{data?.duration}</span>
          </li>
          <li className={style.list}>
            <img src="/icons/icon_member.svg" alt="" />
            <span>스터디 멤버</span>
          </li>
          <div className={style.member}>
            {data && (
              <>
                <div className={style.study_leader}>
                  <MemberList user={data.leader} />
                  <div>
                    <span className={style.leader_tag}>리더</span>
                  </div>
                </div>
                <div className={style.study_member}>
                  {data?.applicants?.map((member: any) => (
                    <MemberList key={member._id} user={member} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

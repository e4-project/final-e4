"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import style from "./MyStudy.module.css";
import Apply from "./Apply";
import Button from "@/components/common/Button";
// 불러올 데이타 인터페이스 다 임포트해야댐

/**
 * @name applicants
 * @author 강이경
 * @desc 마이스터디: 참여 신청한 스터디(모집글), 좋아요한 스터디(모집글), 내가 만든 스터디(모집글), 참여 중인 스터디
 */

interface IProps {
  data: any;
}

const MyStudy = ({ data }: IProps) => {
  // console.log(data?.myCreatedStudy);
  // console.log(data?.myAppliedStudy);
  const myAppliedstudy = data?.myAppliedStudy?.map((info: any) => ({
    _id: info?.studyId?._id,
    userId: info?.applicant,
    studyName: info?.studyId?.studyName,
    rejects: info?.studyId?.rejectedApplications,
    start: info?.studyId?.start,
  }));
  const myCreatedStudy = data?.myCreatedStudy?.map((info: any) => ({
    _id: info?._id,
    studyName: info?.studyName,
    start: info?.start,
  }));

  data?.myAppliedStudy?.map((info: any) => console.log(info));
  const studyRoomInfo = myAppliedstudy?.concat(myCreatedStudy);
  // studyRoomInfo.map((item: any) => console.log({ item: item.userId }));

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.e}>스터디 관리</h1>
        <div className={`${style.section} ${style.d}`}>
          <h2 className={style.section_title}>참여 신청 내역</h2>
          {data?.myAppliedStudy?.length ? (
            data?.myAppliedStudy?.map((item: any) => (
              <Apply key={item._id} {...item} />
            ))
          ) : (
            <div className={style.section_item}>
              아직 신청한 스터디가 없습니다.
            </div>
          )}
        </div>
        <div className={`${style.section} ${style.b}`}>
          <h2 className={style.section_title}>좋아요</h2>
          {/* 좋아요한 recruit post 개수 만큼 map */}
          {/* <Link href={"/해당recruit post링크"}>
            <span className={`${style.section_item} ${style.study_name}`}>
              {study?.studyName}
            </span>
          </Link> */}
          <p className={style.section_item}>아직 좋아요한 스터디가 없습니다.</p>
          {/* <Link href={`/recruit/658310b3bc5fdfc975244aec`}>
            <p className={style.section_item}>해외취업 목표로 JS 기초부터 코딩테스트까지</p>
          </Link> */}
        </div>
        <div className={`${style.section} ${style.c}`}>
          <h2 className={style.section_title}>작성한 모집글</h2>
          {data?.myCreatedStudy?.length ? (
            data?.myCreatedStudy?.map((study: any) => (
              <MyRecruitPost key={study._id} data={study} />
            ))
          ) : (
            <div className={style.section_item}>
              아직 등록한 스터디가 없습니다.
            </div>
          )}
        </div>
        <div className={`${style.section} ${style.a}`}>
          <h1 className={style.section_title}>공부하러 가기 👇</h1>
          {/* 이 링크를 통해 스터디페이지(/study/study_id)로 이동 */}
          {/*  */}
          {studyRoomInfo?.map((study: any) => {
            // 스터디가 start되거나 거절되지 않는 참여 신청자만 스터디룸에 참여 가능
            const studyRoomCondition =
              study.start && !study?.rejects?.includes(study?.userId);
            return (
              studyRoomCondition && (
                <Link key={study?._id} href={`/study/${study?._id}`}>
                  <span className={`${style.section_item} ${style.study_name}`}>
                    {study?.studyName}
                  </span>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
function MyRecruitPost(props: any) {
  const { data } = props;
  return (
    <div className={style.section_item}>
      <div className={style.wrap}>
        <Link href={`/recruit/${data._id}`}>{data.studyName}</Link>
      </div>
      <Link
        className={style.applicants_btn}
        // path: /mystudy/me/:userid(recruitPost leader)/applicants/:recruitid
        href={`/mystudy/me/${data.leader}/applicants/${data._id}`}
      >
        신청자 확인
        {/* 해당 recruit post의 _id 로 구분된 applicants 페이지로*/}
        {/* if close==true(신청 마감되면) -> 버튼 대신 '신청 마감' 표기 */}
      </Link>
      <input
        className={style.check}
        type="checkbox"
        name={data._id}
        id={data._id}
      />
      <label className={style.check_label} htmlFor={data._id}>
        <img src="/icons/icon_dot3.svg" alt="" />
        <div className={style.expansion_box}>
          <Button
            text="수정"
            onClick={async () => {
              console.log("수정 기능");
            }}
          />
          <Button
            text="삭제"
            style={{
              background: "#fd9494",
              color: "#fdfdfd",
              border: "none",
            }}
            onClick={async () => {
              const con = confirm("정말로 삭제하시겠습니까?");
              // if (con) {
              //   const data = await onDelFetch(
              //     postId,
              //     boardId,
              //     data._id
              //   );
              //   data && location.reload();
              // }
            }}
          />
        </div>
      </label>
    </div>
  );
}

export default MyStudy;

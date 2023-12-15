import React from "react";
import Link from "next/link";
import ApplyCancel from "@/components/MyStudy/ApplyCancel";
import style from "./MyStudy.module.css";
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
  const myAppliedstudy = data?.myAppliedStudy?.map((info: any )=> {const {studyId: {_id, studyName}} = info; return {_id, studyName}})
  const myCreatedStudy = data?.myCreatedStudy?.map((info: any)=> {const {_id, studyName} = info; return {_id, studyName}})

  const studyRoomInfo = [...myAppliedstudy, ...myCreatedStudy];
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.top_container}>
          <div className={style.section}>
            <p className={style.section_title}>참여 신청한 스터디</p>
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

          <div className={style.section}>
            <p className={style.section_title}>좋아요한 모집글❤</p>
            {/* 좋아요한 recruit post 개수 만큼 map */}
            {/* <Link href={"/해당recruit post링크"}>
              <span></span>
            </Link> */}
              <p className={style.section_item}>아직 좋아요한 스터디가 없습니다.</p>
          </div>
        </div>

        <div className={style.bottom_container}>
          <div className={style.section}>
            <p className={style.section_title}>내가 만든 스터디(모집글)🖊</p>
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
          <div className={style.section}>
            <p className={style.section_title}>진행 중인 스터디</p>
            {/* 이 링크를 통해 스터디페이지(/study/study_id)로 이동 */}
            {/*  */}
            {studyRoomInfo.map((study) => (
              <Link key={study?._id} href={`/study/${study?._id}`}>
                <span className={style.section_item}>
                  {study?.studyName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
function MyRecruitPost(props: any) {
  const { data } = props;
  return (
    <div className={style.section_item}>
      <Link className={style.study_name} href={`/recruit/${data._id}`}>
        <p>{data.studyName}</p>
      </Link>
      <Link
        className={style.applicants_btn}
        // path: /mystudy/me/:userid(recruitPost leader)/applicants/:recruitid
        href={`/mystudy/me/${data.leader}/applicants/${data._id}`}
      >
        신청자 확인
        {/* 해당 recruit post의 _id 로 구분된 applicants 페이지로*/}
        {/* if close==true(신청 마감되면) -> 버튼 대신 '신청 마감' 표기 */}
      </Link>
    </div>
  );
}

function Apply(props: any) {
  console.log({props})
  const { studyId: study, recognition } = props;
  
  return (
    <div className={style.section_item}>
      <Link className={style.study_name} href={`/recruit/${study._id}`}>
        {study.studyName}
      </Link>
      {
        recognition !== '승인' ? <ApplyCancel {...props} /> : <p className={style.apply_approved_btn}>승인 완료</p>
      }
    </div>
  );
}

export default MyStudy;

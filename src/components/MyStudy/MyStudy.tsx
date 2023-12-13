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
  console.log({apply: data.myApplicants});
  data?.myApplicants?.map((item: any) => console.log(item));
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.top_container}>
          <div className={style.section}>
            <p className={style.section_title}>참여 신청한 스터디</p>
            {data?.myApplicants?.map((item: any) => (
              <Apply key={item._id} {...item} />
            ))}
          </div>

          <div className={style.section}>
            <p className={style.section_title}>좋아요한 모집글❤</p>
            {/* 좋아요한 recruit post 개수 만큼 map */}
            <Link href={"/해당recruit post링크"}>
              <p className={style.section_item}>recruit post의 studyName</p>
            </Link>
          </div>
        </div>

        <div className={style.bottom_container}>
          <div className={style.section}>
            <p className={style.section_title}>내가 만든 스터디(모집글)🖊</p>
            {data?.myStudy.length ? (
              data?.myStudy.map((study: any) => (
                <MyRecruitPost key={study._id} data={study} />
              ))
            ) : (
              <div className={style.section_item}>
                아직 등록한 스터디가 없습니다.
              </div>
            )}
          </div>
          <div className={style.section}>
            <p className={style.section_title}>참여 중인 스터디</p>
            {/* 참여중인 스터디 개수 만큼 map*/}
            <Link href={"/해당 스터디페이지 링크"}>
              <p className={style.section_item}>
                내가 leader이거나 member가 된 study의 studyName
              </p>
            </Link>
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
        href={`/mystudy/${data.leader}/applicants/${data.studyName}`}
        // /mystudy/6576feeeea262d2cf9fd9a8d/applicants/nextjstarcraft
      >
        신청자 확인
        {/* 해당 recruit post의 _id 로 구분된 applicants 페이지로*/}
        {/* if close==true(신청 마감되면) -> 버튼 대신 '신청 마감' 표기 */}
      </Link>
    </div>
  );
}

function Apply(props: any) {
  const { studyId: study } = props;
  return (
    <div className={style.section_item}>
      <Link className={style.study_name} href={`/recruit/${study._id}`}>
        {study.studyName}
      </Link>
      <ApplyCancel {...props} />
    </div>
  );
}

export default MyStudy;

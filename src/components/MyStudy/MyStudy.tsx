import React from "react";
import Link from "next/link";
import ApplyCancel from "@/components/MyStudy/ApplyCancel";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import { useSession } from "next-auth/react";
import style from "./MyStudy.module.css";
// 불러올 데이타 인터페이스 다 임포트해야댐

/**
 * @name applicants
 * @author 강이경
 * @desc 마이스터디: 참여 신청한 스터디(모집글), 좋아요한 스터디(모집글), 내가 만든 스터디(모집글), 참여 중인 스터디
 */

interface IProps {
  data: IRequestRecruitPost[];
}

const MyStudy = ({ data }: IProps) => {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.top_container}>
          <div className={style.section}>
            <p className={style.section_title}>참여 신청한 스터디</p>
            {/* 참여 신청한 recruit post 개수 만큼 map */}
            <Apply />
            <Apply />
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
            {/* 내가 작성한 recruit_post 개수 만큼 map */}
            <MyRecruitPost />
            <MyRecruitPost />
            <MyRecruitPost />
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
function MyRecruitPost(props) {
  const { data: session } = useSession();
  const username = session?.user?.name;
  return (
    <div className={style.section_item}>
      {/* key=[props.i] */}
      <Link className={style.study_name} href={"/해당recruit post링크"}>
        <p>recruit post 의 studyName</p>
      </Link>
      {/* /mystudy/홍길동/applicants/리액트스터디, studyname는 변경됨*/}
      <Link href={`/mystudy/${username}/applicants/studyname`}>
        {/* 해당 recruit post의 _id 로 구분된 applicants 페이지로*/}
        {/*  href={'/mystudy/applicants/' + myRecruitPost[i]._id.toString()}> */}

        <p className={style.applicants_btn}>신청자 확인</p>
        {/* if close==true(신청 마감되면) -> 버튼 대신 '신청 마감' 표기 */}
      </Link>
    </div>
  );
}

function Apply(props) {
  {
    /* const render = () => {
        if (recognition === '거절'){
            return <div>거절됨</div>
        } else if (recognition === '승인'){
            return <div>승인됨</div>
        } else (recognition === '대기'){
            return (
                <ApplyCancel/>
            )
            
        }
    } */
  }

  return (
    <div className={style.section_item}>
      {" "}
      {/* key=[props.i] */}
      <Link className={style.study_name} href={"/해당recruit post링크"}>
        <p>recruit post의 studyName</p>
      </Link>
      {/* {render()} */}
      <ApplyCancel />
    </div>
  );
}

export default MyStudy;

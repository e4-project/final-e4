import Link from "next/link";
import style from "./MyStudy.module.css";

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
    </div>
  );
}

export default MyRecruitPost;
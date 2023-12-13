import React from "react";
import Link from "next/link";
import style from "./Applicants.module.css";
import ApplyCancel from "@/components/MyStudy/ApplyCancel";
import { IResponseRecruitPost } from "@/interfaces/recruit";
// 불러올 데이타 인터페이스 다 임포트해야댐

import Reject from "./Reject";
import Approve from "./Approve";
import dayjs from "dayjs";

/**
 * @name applicants
 * @author 강이경
 * @desc 스터디 참여 신청자 목록 페이지: 스터디 정보, 스터디 시작버튼, 참여 신청자 및 신청메세지, 신청자 승인/거절
 */

interface IProps {
  data: IResponseRecruitPost[];
}

const Applicants = ({ data }: IProps) => {
  
  // let db = (await connectDB).db('e4');
  // let applicantData = await db.collection('applicant').findOne({applypostid: props.params.recruitId}); //유저 참여 신청
  // let mypost = await db.collection('posts').findOne({_id: new ObjectId(props.params.recruitId) }); //모집공고
  // 모집글post의 _id, 신청 메세지message, applicant_name(신청자이름)

  // const {data} = await loadRecruit();
  // data.map((item: any )=> console.log({itemName: item._id}))

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.left_container}>
          <div className={style.study_info}>
            <StudyInfo data={data}/>
            {/* <StudyInfo studyName={내가작성한recrutPost.studyName} material={내가작성한recrutPost.material}/> */}
          </div>
          <button className={style.study_start}>스터디 시작하기</button>
          {/* 스터디 시작시 스터디페이지 생성, 모집글 목록에서 숨김, 신청 마감(모집글에서 신청하기 버튼 비활성 */}

          <div className={style.member}>
            <p className={style.font_bold}>스터디 멤버</p>
            <p>recognition = 승인 인 유저 이름</p>
            <p>recognition = 승인 인 유저 이름</p>
          </div>
        </div>

        <div className={style.right_container}>
          <h3 className={style.section_title}>스터디 참여 신청자</h3>
          <div className={style.applicant_list}>
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            <Applicant />
            {/* <Applicant userName={applicantData.userName} message={applicantData.message} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
//모집 공고글(신지수): 신청자 이름이

function StudyInfo(props: any) {
  const {data} = props;
  console.log({ss: data})
  return (
    <div className={style.study_info_item}>
      <div className={style.study_info_titles}>
        <h2 className={style.mtitle}>{data.studyName}</h2>
        <p className={style.mtitle}>{data.material}</p>
      </div>
      <div className={style.study_info_contents}>
        <li className={style.list}>
          <img src="/icons/icon_calendar.svg" alt="" />
          <span>스터디 기간</span>
          <span className={style.font_bold}>{data?.duration}</span>
        </li>
        <li className={style.list}>
          <img src="/icons/icon_member.svg" alt="" />
          <span>모집 인원</span>
          <span className={style.font_bold}>{data?.headCount}명</span>
        </li>
        <li className={style.list}>
          <img src="/icons/icon_time.svg" alt="" />
          <span> 모집 마감</span>
          <span className={style.font_bold}>{dayjs(data?.deadLine).format('MM월 DD일')}</span>
          
        </li>
        {/* <p>{data.duration}</p>
        <p>{data.headCount}</p>
        <p>{dayjs(data.deadLine).format('MM/DD/YYYY')}</p> */}
      </div>
    </div>
  );
}

function Applicant(props: any) {
  return (
    <div className={style.section_item}>
      <p className={style.font_bold}>참여 신청자 applicant</p>
      <p className={style.applicant_message}>참여 신청 메세지 message</p>
      <div className={style.applicant_btns}>
        <Approve />
        <Reject />
      </div>
    </div>
  );
}

export default Applicants;

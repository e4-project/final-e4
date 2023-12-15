import React, { useCallback } from "react";
import dayjs from "dayjs";
import { IApplicant, IResponseApplicantStatus } from "@/interfaces/applicants";
import Reject from "./Reject";
import Approve from "./Approve";
import style from "./Applicants.module.css";
import { deleteRejectApplicantApi } from "@/axios/fetcher/applicant/deleteRejectApplicantApi";
import { patchApproveApplicantApi } from "@/axios/fetcher/applicant/patchApproveApplicantApi";
import Avatar from "../common/Avatar";
/**
 * @name applicants
 * @author 강이경
 * @desc 스터디 참여 신청자 목록 페이지: 스터디 정보, 스터디 시작버튼, 참여 신청자 및 신청메세지, 신청자 승인/거절
 */

interface IProps {
  data: IResponseApplicantStatus;
}

const StyledImg = {
  display: "inline-block",
  borderRadius: "5px",
  padding: "2px",
};

const Applicants = ({ data }: IProps) => {
  console.log({ apply__: data });
  const notApprovedUsers = data.applicants.some(
    (u) => u.recognition === "대기"
  );
  console.log(data.applicants.length, notApprovedUsers, {
    notApprovedUsers,
  });
  data.applicants.length && !notApprovedUsers
    ? data.applicants.map((u) => console.log({ u }))
    : {};
  console.log(notApprovedUsers);
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.left_container}>
          <div className={style.study_info}>
            <StudyInfo data={data} />
            {/* <StudyInfo studyName={내가작성한recrutPost.studyName} material={내가작성한recrutPost.material}/> */}
          </div>
          <button className={style.study_start}>스터디 시작하기</button>
          {/* 스터디 시작시 스터디페이지 생성, 모집글 목록에서 숨김, 신청 마감(모집글에서 신청하기 버튼 비활성 */}

          <div className={style.member}>
            {/* 승인된 유저 */}
            <p className={style.font_bold} style={{ marginBottom: 20 }}>
              승인된 스터디 멤버
            </p>
            {data.applicants.length ? (
              data.applicants.map(
                (user) =>
                  user.recognition === "승인" && (
                    <div
                      key={user.applicant._id}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <Avatar
                        src={user.applicant.image}
                        alt="pimg"
                        style={StyledImg}
                      />
                      <p key={user.applicant._id}>{user.applicant.name}</p>
                    </div>
                  )
              )
            ) : (
              <p>아직 승인된 유저가 없습니다.</p>
            )}
          </div>
        </div>

        <div className={style.right_container}>
          <h3 className={style.section_title}>스터디 참여 신청자</h3>
          <div className={style.applicant_list}>
            {/* 대기 */}
            {data.applicants.length ? (
              data.applicants.map(
                (applicant) =>
                  applicant.recognition === "대기" ? (
                    <Applicant key={applicant._id} data={applicant} />
                  ) : <div key={applicant._id}>대기아님</div>
              )
            ) : (
              <div className={style.section_item}>
                아직 스터디에 참여한 신청자가 없습니다.
              </div>
            )}
            {/* <Applicant userName={applicantData.userName} message={applicantData.message} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

function StudyInfo(props: any) {
  const { data } = props;
  return (
    <div className={style.study_info_item}>
      <div className={style.study_info_titles}>
        <h2 className={style.mtitle}>{data?.studyName}</h2>
        <p className={style.mtitle}>{data?.material}</p>
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
          <span className={style.font_bold}>
            {dayjs(data?.deadLine).format("MM월 DD일")}
          </span>
        </li>
      </div>
    </div>
  );
}

function Applicant({ data }: { data: IApplicant }) {
  console.log({ apply: data });

  const onApprove = useCallback(async () => {
    console.log("승인됨");
    patchApproveApplicantApi(data.applicant._id, "승인");
  }, [data.applicant._id]);

  const onReject = useCallback(async () => {
    console.log("거절됨");
    deleteRejectApplicantApi(data.applicant._id);
  }, [data.applicant._id]);

  return (
    <div className={style.section_item}>
      <p className={style.applicant_name}>{data.applicant.name}</p>
      <p className={style.applicant_message}>{data.message}</p>
      <div className={style.applicant_btns}>
        <Approve onApprove={onApprove} />
        <Reject onReject={onReject} />
      </div>
    </div>
  );
}

export default Applicants;

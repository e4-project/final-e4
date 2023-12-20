import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { IApplicant, IResponseApplicantStatus } from "@/interfaces/applicants";
import Avatar from "@/components/common/Avatar";
import Reject from "./Reject";
import Approve from "./Approve";
import style from "./Applicants.module.css";
import { patchApproveOrRejectApplicantApi } from "@/axios/fetcher/applicant";
/**
 * @name applicants
 * @author 강이경
 * @desc 스터디 참여 신청자 목록 페이지: 스터디 정보, 스터디 시작버튼, 참여 신청자 및 신청메세지, 신청자 승인/거절
 */

interface IProps {
  data: IResponseApplicantStatus;
  members: any;
}

const StyledImg = {
  display: "inline-block",
  borderRadius: "5px",
  padding: "2px",
};

const Applicants = ({ data, members }: IProps) => {
  console.log({members})
  console.log({appli: data})
  // let isApprovedUser = false;
  let isWaitUser = false;

  const router = useRouter();
  const onApprove = useCallback(
    async (applicantId: string, studyId: string) => {
        const result = await patchApproveOrRejectApplicantApi(
          applicantId,
          studyId,
          "승인"
        );
        console.log("승인됨, ", result);
        router.refresh();
    },
    [router]
  );

  const onReject = useCallback(
    async (applicantId: string, studyId: string) => {
      console.log("요청전", applicantId);
      const result = await patchApproveOrRejectApplicantApi(
        applicantId,
        studyId,
        "거절"
      );
      console.log("거절됨", result);
      router.refresh();
    },
    [router]
  );
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.left_container}>
          <div className={style.study_info}>
            <StudyInfo data={data} members={members}/>
          </div>
          <button title={!data?.start ? "모집 인원이 완료되어야 스터디 관리 페이지가 활성화됩니다." : ""} disabled={!data?.start} className={`${style.study_start} ${!data?.start ? style.btn_disabled : ""}`} onClick={() => {
            router.push(`/study/${data?._id}`)
          }}>스터디 시작하기</button>
          <div className={style.bg}>
            <div className={style.member}>
              <p className={style.font_bold} style={{ marginBottom: 20 }}>
                승인된 스터디 멤버
              </p>
              {members?.map(
                (user: any) =>
                  user.rel !== "leader" && (
                    <>
                      <div
                        key={user.member._id}
                        style={{
                          display: "flex",
                          gap: 9,
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <Avatar
                          src={user.member.image}
                          alt="pimg"
                          style={StyledImg}
                        />
                        <p key={user.member._id}>
                          {user.member.name}
                        </p>
                      </div>
                    </>
                  )
              )}
              {members?.length === 0 && <div>승인된 유저가 없습니다.</div>}
            </div>
          </div>
        </div>

        <div className={style.right_container}>
          <h3 className={style.section_title}>스터디 참여 신청자</h3>
          <div className={style.applicant_list}>
            {/* 대기 */}
            {data?.applicants?.length ? (
              <>
                {data.applicants.map((user) => {
                  if (user.recognition === "대기") {
                    isWaitUser = true;
                    return (
                      <Applicant
                        key={user._id}
                        data={user}
                        onApprove={onApprove}
                        onReject={onReject}
                      />
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              <></>
            )}
            {!isWaitUser && <div>아직 스터디에 참여한 신청자가 없습니다.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

function StudyInfo(props: any) {
  const { data, members } = props;
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
          <span className={style.font_bold}>{members?.length}&#47;{data?.headCount}명</span>
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

function Applicant({
  data,
  onApprove,
  onReject,
}: {
  data: IApplicant;
  onApprove: (applicantId: string, studyId: string) => void;
  onReject: (applicantId: string, studyId: string) => void;
}) {
  // console.log({ apply: data });

  return (
    <div className={style.section_item}>
      <p className={style.applicant_name}>
        <div
          key={data.applicant._id}
          style={{
            display: "flex",
            gap: 9,
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <Avatar src={data.applicant.image} alt="pimg" style={StyledImg} />
          <p key={data.applicant._id}>{data.applicant.name}</p>
        </div>
      </p>
      <p className={style.applicant_message}>{data.message}</p>
      <div className={style.applicant_btns}>
        <Approve
          userId={data.applicant?._id}
          studyId={data.studyId}
          onApprove={onApprove}
        />
        <Reject
          userId={data.applicant?._id}
          studyId={data.studyId}
          onReject={onReject}
        />
        {/* <Reject onReject={onReject} /> */}
      </div>
    </div>
  );
}

export default Applicants;

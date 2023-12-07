import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import ApplicantsView from "./page.view";
// /mystudy/홍길동/applicants/리액트스터디
//TODO: 로그인한 유저로 applicant 모델에서 applicant + recruitPostId(스터디) + member정보 가져오기
const ApplicantsPage = async () => {
  const data: IRequestRecruitPost[] = await loadRecruitApi();

  return (
    <div>
      <ApplicantsView data={data} />
    </div>
  );
};

export default ApplicantsPage;

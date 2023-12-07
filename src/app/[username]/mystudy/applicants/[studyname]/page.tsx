import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import ApplicantsView from './page.view';
// /홍길동/mystudy/applicants/리액트스터디
const ApplicantsPage = async () => {
  const data: IRequestRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      <ApplicantsView data={data} />
    </div>
  );
};

export default ApplicantsPage;





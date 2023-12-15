import React from "react";
import ApplicantsView from "./page.view";
import { loadApplicantOfMyStudyApi } from "@/axios/fetcher/applicant/loadMyApplicantApi";

/* 
   path: /mystudy/me/:userid/applicants/:recruitid
*/
const Page = async ({ params }: { params: { userid: string, recruitid: string } }) => {
  const userId = params.userid;
  const recruitId = params.recruitid
  // 스터디 참여 신청자
  console.log("스터디 참여 신청자")
  const data = await loadApplicantOfMyStudyApi(userId, recruitId)
  return (
    <div>
      <ApplicantsView data={data}/>
    </div>
  );
};

export default Page;

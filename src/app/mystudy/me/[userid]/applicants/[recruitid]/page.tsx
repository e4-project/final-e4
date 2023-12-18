import React from "react";
import ApplicantsView from "./page.view";
import { loadApplicantOfMyStudyApi } from "@/axios/fetcher/applicant";
import { loadMystudyMemberApi } from "@/axios/fetcher/mystudy";

/* 
   path: /mystudy/me/:userid/applicants/:recruitid
*/
const Page = async ({ params }: { params: { userid: string, recruitid: string } }) => {
  const userId = params.userid;
  const recruitId = params.recruitid
  // 스터디 참여 신청자
  console.log("스터디 참여 신청자")
  const data = await loadApplicantOfMyStudyApi(userId, recruitId)
  // 승인된 멤버는 member에서 가져오는게 좋다고 판단. 
  const members = await loadMystudyMemberApi(userId, recruitId)
  console.log({data, members})
  return (
    <div>
      <ApplicantsView data={data} members={members}/>
    </div>
  );
};

export default Page;

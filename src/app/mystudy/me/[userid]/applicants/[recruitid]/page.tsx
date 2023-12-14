import React from "react";
import ApplicantsView from "./page.view";

/* 
   path: /mystudy/me/:userid/applicants/:recruitid
   ex) /mystudy/me/657968bdd2d684ad75a2a616/applicants/6576feeeea262d2cf9fd9a8d
*/
const Page = async ({ params }: { params: { userid: string, recruitid: string } }) => {
  console.log({u: params.userid, ri: params.recruitid})
  // 스터디 참여 신청자

  return (
    <div>
      <ApplicantsView />
    </div>
  );
};

export default Page;

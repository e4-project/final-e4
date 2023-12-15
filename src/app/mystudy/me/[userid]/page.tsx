import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MyStudyView from "./page.view";
import { redirect } from "next/navigation";
import { loadMystudyOneApi } from "@/axios/fetcher/mystudy/loadMystudyOneApi";
import { loadMyApplicantApi } from "@/axios/fetcher/applicant/loadMyApplicantApi";
import User from "@/models/user";
/* 
   name: 내 스터디
   path: /mystudy/me/:userid
   ex) /mystudy/me/657968bdd2d684ad75a2a616
*/

const Page = async ({ params }: { params: { userid: string } }) => {
  //TODO: MyStudy 페이지에서 로그인한 유저인지를 판단
  let session = await getServerSession(authOptions);
  if (!session) {
    console.log("인증이 필요합니다."); // 모달창으로 변경할 예정
    return redirect("/study");
  }
  const userId = params.userid;
  const myStudyInfo = await loadMystudyOneApi(userId);
  const myAppliedStudy = await loadMyApplicantApi(userId);
  console.log({myStudyInfo, myAppliedStudy})
  const data = {
    myCreatedStudy: myStudyInfo?.createdMyStudy,
    myAppliedStudy,
  };
  return (
    <div>
      <MyStudyView data={data} />
    </div>
  );
};

export default Page;

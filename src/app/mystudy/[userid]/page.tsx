import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MyStudyView from "./page.view";
import { redirect } from "next/navigation";
import { loadMystudyOneApi } from "@/axios/fetcher/mystudy/loadMystudyOneApi";
import { loadMyApplicantApi } from "@/axios/fetcher/applicant/loadMyApplicantApi";
// /mystudy/홍길동/applicants/리액트스터디

const Page = async () => {
  //TODO: MyStudy 페이지에서 로그인한 유저인지를 판단
  let session = await getServerSession(authOptions);
  if (!session) {
    console.log("인증이 필요합니다."); // 모달창으로 변경할 예정
    return redirect("/study");
  }
  const userName = session.user?.name;
  const myCreatedStudy: any = await loadMystudyOneApi(userName as string);
  const myApplicants = await loadMyApplicantApi(myCreatedStudy.myStudyList[0]?.leader);

  const data = {
    myStudy: myCreatedStudy.myStudyList,
    myApplicants: [...myApplicants]
  }
  return (
    <div>
      <MyStudyView data={data}/>
    </div>
  );
};

export default Page;

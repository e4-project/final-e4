import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import MyStudyView from "./page.view";
import { redirect } from "next/navigation";
import { loadMystudyOneApi } from "@/axios/fetcher/mystudy/loadMystudyOneApi";
// /mystudy/홍길동/applicants/리액트스터디

interface IResponseMyStudy {
  myStudyList: { _id: string; studyName: string }[];
}

const Page = async () => {
  //TODO: MyStudy 페이지에서 로그인한 유저인지를 판단
  let session = await getServerSession(authOptions);
  if (!session) {
    console.log("인증이 필요합니다."); // 모달창으로 변경할 예정
    return redirect("/study");
  }
  const userName = session.user?.name;
  const data: any = await loadMystudyOneApi(userName as string);
  return (
    <div>
      <MyStudyView data={data} />
    </div>
  );
};

export default Page;

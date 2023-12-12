import React from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import ApplicantsView from "./page.view";
import { loadRecruitOneByNameApi } from "@/axios/fetcher/recruit/loadRecruitOneApi";
// /mystudy/홍길동/applicants/리액트스터디
//TODO: 로그인한 유저로 applicant 모델에서 applicant + recruitPostId(스터디) + member정보 가져오기
const Page = async ({ params }: { params: { username: string, studyname: string } }) => {
  console.log(params)
  const {username, studyname} = params;
  const data: IResponseRecruitPost[] = await loadRecruitOneByNameApi(studyname);
  console.log({data})
  return (
    <div>
      <ApplicantsView data={data} />
    </div>
  );
};

export default Page;

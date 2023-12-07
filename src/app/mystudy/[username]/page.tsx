import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import MyStudyView from './page.view';
// /mystudy/홍길동/applicants/리액트스터디
const MyStudyPage = async () => {
  //TODO: MyStudy 페이지에서 로그인한 유저인지를 판단
  const data: IRequestRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      <MyStudyView data={data} />
    </div>
  );
};

export default MyStudyPage;
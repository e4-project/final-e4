import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import MyStudyView from './page.view';

const MyStudyPage = async () => {
  const data: IRequestRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      <MyStudyView data={data} />
    </div>
  );
};

export default MyStudyPage;
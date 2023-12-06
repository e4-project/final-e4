import React from "react";
import RecruitView from "./page.view";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IRequestRecruitPost } from "@/interfaces/recruit";

const Page = async () => {
  const data: IRequestRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      <RecruitView data={data} />
    </div>
  );
};

export default Page;

import React from "react";
import RecruitView from "./page.view";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IResponseRecruitPost } from "@/interfaces/recruit";

const Page = async () => {
  const data: IResponseRecruitPost[] = await loadRecruitApi();
  console.log(data);
  return (
    <div>
      <RecruitView data={data} />
    </div>
  );
};

export default Page;

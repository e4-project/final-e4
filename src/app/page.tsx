import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IResponseRecruitPost } from "@/interfaces/recruit";

const Page = async () => {
  const data: IResponseRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      Introl Page
    </div>
  );
};

export default Page;

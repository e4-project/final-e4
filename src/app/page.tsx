import React from "react";
import { loadRecruitApi } from "@/axios/fetcher/recruit/loadRecruitApi";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Mainpage from "@/app/intropage/page"

const Page = async () => {
  const data: IResponseRecruitPost[] = await loadRecruitApi();
  return (
    <div>
      <Mainpage/>
    </div>
  );
};

export default Page;

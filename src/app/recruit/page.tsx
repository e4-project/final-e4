import React from "react";
import RecruitView from "./page.view";
import { getRecruitApi } from "@/apis/getRecruitApi";

const Page = async () => {
  const {data} = await getRecruitApi();
  return (
    <div>
      <RecruitView data={data} />
    </div>
  );
};

export default Page;

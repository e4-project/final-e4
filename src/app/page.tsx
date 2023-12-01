import React from "react";
import { getRecruitApi } from "@/apis/getRecruitApi";
import RecruitView from "./page.view";

const Page = async () => {
  const { data } = await getRecruitApi();
  //데이터 입력
  console.log({ data });
  return (
    <div>
      <RecruitView data={data} />
    </div>
  );
};

export default Page;

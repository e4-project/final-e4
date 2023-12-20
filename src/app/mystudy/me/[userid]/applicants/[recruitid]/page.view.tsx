"use client";
import React from "react";
import Applicants from "@/components/Applicants/Applicants";
const ApplicantsView = ({data, members}: any) => {
  //화면 출력
  console.log({members})
  const memberCommon = members.filter((members: any) => members.rel === 'common')
  console.log(memberCommon)
  return <Applicants data={data} members={memberCommon}/>;
};

export default ApplicantsView;

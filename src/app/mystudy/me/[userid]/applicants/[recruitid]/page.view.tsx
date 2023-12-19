"use client";
import React from "react";
import Applicants from "@/components/Applicants/Applicants";
const ApplicantsView = ({data, members}: any) => {
  //화면 출력
  return <Applicants data={data} members={members}/>;
};

export default ApplicantsView;

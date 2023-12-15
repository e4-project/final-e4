"use client";
import React from "react";
import Applicants from "@/components/Applicants/Applicants";
const ApplicantsView = ({data}: any) => {
  //화면 출력
  return <Applicants data={data}/>;
};

export default ApplicantsView;

"use client";
import React from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import MyStudy from "@/components/MyStudy/MyStudy";

interface IProps {
  data: IResponseRecruitPost[];
}

const MyStudyView = (props: IProps) => {
  const { data } = props;
  //화면 출력
  return <MyStudy data={data} />;
};

export default MyStudyView;

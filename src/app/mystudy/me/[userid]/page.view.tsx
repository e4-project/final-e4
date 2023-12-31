"use client";
import React from "react";
import MyStudy from "@/components/MyStudy/MyStudy";

interface IProps {
  data: any;
}

const MyStudyView = (props: IProps) => {
  const { data } = props;
  //화면 출력
  return <MyStudy data={data} />;
};

export default MyStudyView;

"use client";
import React, { use, useState } from "react";
// import style from "./style.module.css";
// import { TfiSearch } from "react-icons/tfi";
// import ImgSlider from "@/components/ImgSlider";
// import Link from "next/link";
import RecruitList from "@/components/RecruitList";
import { IResponseRecruitPost } from "@/interfaces/recruit";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IResponseRecruitPost[];
}

const RecruitView = (props: IProps) => {
  const { data } = props;
  //화면 출력
  return (
     <RecruitList data={data}/>
  );
}

export default RecruitView;

"use client";
import React, { use, useState } from "react";
import { IRecruit } from "@/interfaces/recruit";
// import style from "./style.module.css";
// import { TfiSearch } from "react-icons/tfi";
// import ImgSlider from "@/components/ImgSlider";
// import Link from "next/link";
import RecruitList from "@/components/RecruitList";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IRecruit[];
}

const RecruitView = (props: IProps) => {
  const { data } = props;
  console.log({data})
  //화면 출력
  return (
     <RecruitList data={data}/>
  );
}

export default RecruitView;

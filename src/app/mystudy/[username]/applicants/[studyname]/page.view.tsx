'use client';
import React, { use, useState } from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Applicants from '@/components/Applicants/Applicants';



interface IProps {
    data: IResponseRecruitPost[];
  }
  
  const ApplicantsView = (props: IProps) => {
    const { data } = props;
    //화면 출력
    return (
       <Applicants data={data}/>
    );
  }
  
  export default ApplicantsView;
















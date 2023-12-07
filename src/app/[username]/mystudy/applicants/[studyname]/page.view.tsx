'use client';
import React, { use, useState } from "react";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import Applicants from '@/components/Applicants/Applicants';



interface IProps {
    data: IRequestRecruitPost[];
  }
  
  const ApplicantsView = (props: IProps) => {
    const { data } = props;
    //화면 출력
    return (
       <Applicants data={data}/>
    );
  }
  
  export default ApplicantsView;
















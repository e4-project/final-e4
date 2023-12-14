"use client";
import React, { useEffect, useState } from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Applicants from "@/components/Applicants/Applicants";
import { IResponseUser } from "@/interfaces/user";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
import { loadMyApplicantApi } from "@/axios/fetcher/applicant/loadMyApplicantApi";

const ApplicantsView = () => {
  const [currentUser, setCurrentUser] = useState<IResponseUser | null>(null);
  const [applicant, setApplicant] = useState(null);
  useEffect(() => {
    (async () => {
      // 로그인 유저의 참여 신청한 스터디 데이터를 가져오기
      // → page.tsx(server component)에서는 user._id를 가져오려면 loadUserApi axios api을
      //   호출해야하는데 session이 undefined인 경우 에러나기 떄문에 여기서 처리하기로함. 
      // → page.view.tsx(client compoenent)에서 처리함 
      const user: IResponseUser = await loadUserApi();
      const applicant = await loadMyApplicantApi(user._id);
      setCurrentUser(user);
      setApplicant(applicant);
    })();
  }, []);

  //화면 출력
  return <Applicants />;
};

export default ApplicantsView;

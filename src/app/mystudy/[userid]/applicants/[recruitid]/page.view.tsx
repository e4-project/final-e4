"use client";
import React, { useEffect, useState } from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Applicants from "@/components/Applicants/Applicants";
import { IResponseUser } from "@/interfaces/user";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
import { loadMyApplicantApi } from "@/axios/fetcher/applicant/loadMyApplicantApi";

interface IProps {
  data: IResponseRecruitPost[];
}

const ApplicantsView = () => {
  const [currentUser, setCurrentUser] = useState<IResponseUser | null>(null);
  const [applicant, setApplicant] = useState(null);
  useEffect(() => {
    (async () => {
      const user: IResponseUser = await loadUserApi();
      const applicant = await loadMyApplicantApi(user._id);
      setCurrentUser(user);
      setApplicant(applicant);
    })();
  }, []);

  console.log({ currentUser, applicant });

  //화면 출력
  return <Applicants />;
};

export default ApplicantsView;

import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitByIdApi";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from 'next/image';
import Modal from "@/components/common/modal/page";
import Dummy from "@/dummy/data.json";
import Coment from "@/components/coment/ComentEditer";
import ComentList from "@/components/coment/ComentList";
import style from "@/styles/style.module.css";
import { IRequestRecruitPost } from "@/interfaces/recruit_list";
import StudyPageView from "./page.view";

export default async function Page({ params }: { params: { slug: string } }) {
  const data: IRequestRecruitPost = await loadRecruitOneByIdApi(params.slug);

  return (
    <div>
      <StudyPageView data={data}/>
    </div>
  );
}

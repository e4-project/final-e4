"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/common/modal/page";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import CommentForm from "@/components/Comment/CommentForm";
import SingleComment from "@/components/Comment/SingleComment";
import style from "./recruit.module.css";
import { RenderHtmlContext } from "@/components/common/Card";

// const coment_data: any = [];
interface IProps {
  data: IResponseRecruitPost;
}
export default function StudyPageView({ data }: IProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  // const [coment, setComent] = useState(coment_data);
  // const idRef = useRef(3);
  // const onCreate = (content: any) => {
  //   const newComent = {
  //     id: idRef.current,
  //     isDone: false,
  //     content,
  //     createdDate: new Date().getTime(),
  //   };
  //   setComent([newComent, ...coment]);
  //   idRef.current += 1;
  //   console.log(coment);
  // };
  // const onUpdate = (id: any) => {
  //   setComent(
  //     coment.map((coment: any) =>
  //       coment.id === id ? { ...coment, isDone: !coment.isDone } : coment
  //     )
  //   );
  // };
  // const onDelete = (id: any) => {
  //   setComent(coment.filter((coment: any) => coment.id !== id));
  // };
  return (
    <div className={style.sheet}>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      <div className={style.style}>
        {/*  */}
        <div className={style.area1}>
          <ul className={style.area1_sheet}>
            <li className={style.list}>
              {data.studyKeyword.split(", ").map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </li>
            <li className={style.list}>
              <span>{data.materialType}</span>
            </li>
            <li className={style.list}>
              <h2>{data.material}</h2>
            </li>
            <li className={style.list}>
              <button>
                <Link href={data.materialUrl} target="_blank">
                  <span>정보보기</span>
                  <span>교재정보</span>
                </Link>
              </button>
            </li>
            <li className={style.list}>
              <span>스터디 기간 {data.duration}</span>
            </li>
            <li className={style.list}>
              <span>모집 인원 {data.headCount}명</span>
            </li>
            <li className={style.list}>
              <div className={style.buttonarea}>
                <p>모집 마감</p>
                <button
                  className={style.application_button}
                  onClick={showModal}
                >
                  스터디 참여 신청
                </button>

                <input
                  className={style.good_check}
                  type="checkbox"
                  name=""
                  id="good"
                />
                <label className={style.good_label} htmlFor="good">
                  <div className={style.good}>
                    좋아요
                    <img src="/icons/icon_like.svg" alt="" />
                  </div>
                  <div className={style.box}></div>
                  <div className={style.box}></div>
                  <div className={style.box}></div>
                  <div className={style.box}></div>
                  <div className={style.box}></div>
                </label>
              </div>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className={style.area2}>
          <div className={style.study_title}>
            <div>
              <div
              // dangerouslySetInnerHTML={{
              //   __html: `<div>${data.content}<div>`,
              // }}
              />
              {RenderHtmlContext(data.content)}
            </div>
          </div>
          <div className={style.comment_container}>
            <div>
              <CommentForm postId="" />
            </div>
            <div>
              <SingleComment postId={""} fetcher={async () => {}} />
            </div>
          </div>

          {/* <div className={style.comment}>
            <Coment onCreate={onCreate} />
            <ComentList
              coment={coment}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

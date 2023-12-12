"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import CommentForm from "@/components/Comment/CommentForm";
import { RenderHtmlContext } from "@/components/common/Card";
import CustomModal from "@/components/common/modal/Custom/page";
import style from "./recruit.module.css";
import modalStyle from "@/components/common/modal/modal.module.css";
import { useSession } from "next-auth/react";
import { postApplicantApi } from "@/axios/fetcher/applicant/postApplicantApi";
import { postRecruitComment } from "@/axios/fetcher/recruitComment/postRecruitComment";
import SingleComment from "@/components/Comment/SingleComment";
import { loadRecruitComment } from "@/axios/fetcher/recruitComment/loadRecruitComment";
import { deleteRecruitComment } from "@/axios/fetcher/recruitComment/deleteRecruitComment";

interface IUser {
  name: string;
  email: string;
  image: string;
}
interface IProps {
  data: IResponseRecruitPost;
}
export default function StudyPageView({ data }: IProps) {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as IUser;
  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const onSubmitRecruit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      const insertData = {
        userName: user?.name as string,
        message: message.trim(),
        studyId: data?._id,
      };
      await postApplicantApi(insertData);
    } else {
      window.alert("인증이 필요합니다.");
    }
    closeModal();
    setMessage("");
  };
  return (
    <div className={style.sheet}>
      {modalOpen && (
        <CustomModal setModalOpen={setModalOpen}>
          <form action="" onSubmit={onSubmitRecruit}>
            <div className={modalStyle.modal_text}>
              <h2>스터디 참여 신청하기</h2>
              <p>
                간단한 자기소개, 스터디를 하려는 이유 등 스터디 소개글을
                참고하여 신청글을 작성해주세요
              </p>
            </div>
            <div className={modalStyle.textarea}>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={onChangeMessage}
              />
            </div>
            <div className={modalStyle.application}>
              <button>신청하기</button>
            </div>
          </form>
        </CustomModal>
      )}
      <div className={style.style}>
        <div className={style.area1}>
          <ul className={style.area1_sheet}>
            <li className={style.list}>
              {data?.studyKeyword.split(", ").map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </li>
            <li className={style.list}>
              <span>{data?.materialType}</span>
            </li>
            <li>
              <h2 className={style.mtitle}>{data?.material}</h2>
            </li>
            <li className={style.list}>
              <button>
                <Link href={`${data?.materialUrl}`} target="_blank">
                  <span>보러 가기</span>
                  <span>교재 정보</span>
                </Link>
              </button>
            </li>
            <li className={style.list}>
              <img src="/icons/icon_calendar.svg" alt="" />
              <span style={{ whiteSpace: "pre-wrap" }}>스터디 기간 </span>
              <span>{data?.duration}</span>
            </li>
            <li className={style.list}>
              <img src="/icons/icon_member.svg" alt="" />
              <span style={{ whiteSpace: "pre-wrap" }}>모집 인원 </span>
              <span>{data?.headCount}명</span>
            </li>
            <li className={style.list}>
              <div className={style.buttonarea}>
                <div className={style.dead_line}>
                  <span>{data?.deadLine}</span>
                  <span> 모집 마감</span>
                </div>
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
          <div className={style.recruit_post}>
            <h2>{RenderHtmlContext(data?.studyName)}</h2>
            <p>{RenderHtmlContext(data?.content)}</p>
          </div>
          <div className={style.comment}>
            <div>
              <CommentForm
                fetcher={postRecruitComment}
                user={{ name: user?.name, image: user?.image }}
                postId={data._id}
              />
            </div>
            <div>
              <SingleComment
                isToggleCtrl={false}
                postId={data._id}
                loadFetcher={loadRecruitComment}
                delFetcher={deleteRecruitComment}
                updateFetcher={async () => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

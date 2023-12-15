"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import CommentForm from "@/components/Comment/CommentForm";
import { RenderHtmlContext } from "@/components/common/Card";
import CustomModal from "@/components/common/modal/Custom/page";
import modalStyle from "@/components/common/modal/modal.module.css";
import SingleComment from "@/components/Comment/SingleComment";
import { IResponseUser } from "@/interfaces/user";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
import {
  loadRecruitComment,
  deleteRecruitComment,
  postRecruitComment,
} from "@/axios/fetcher/recruitComment";
import style from "./recruit.module.css";
import { postApplicantApi } from "@/axios/fetcher/applicant/postApplicantApi";
import dayjs from "dayjs";
import { isDeadLine } from "@/utils/isDeadLine";

interface IProps {
  data: IResponseRecruitPost;
}
export default function StudyPageView({ data }: IProps) {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isApplicant, setIsApplicant] = useState<null | boolean>(null);
  const [currentUser, setCurrentUser] = useState<IResponseUser | null>(null);
  const deadLine = new Date(data?.deadLine).getTime();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const data = await loadUserApi();
      setCurrentUser(data);
    })();
  }, []);

  useEffect(() => {
    if (data && currentUser) {
      const isApplicant = data?.applicants.includes(currentUser?._id as string);
      setIsApplicant(isApplicant);
    }
  }, [currentUser, data]);

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
    if (currentUser) {
      const insertData = {
        userId: currentUser._id,
        message: message.trim(),
        studyId: data?._id,
      };
      await postApplicantApi(insertData);
      router.refresh(); //refresh는 이벤트 처리가 있는 컴포넌트 전체(페이지 단위)에서 적용됨
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
              <h2>스터디 참여 신청</h2>
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
            <li className={style.keyword}>
              {data?.studyKeyword.split(", ").map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </li>
            <li className={style.list}>
              <p className={style.size14}>{data?.materialType}</p>
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
              <span>스터디 기간</span>
              <span className={style.font_bold}>{data?.duration}</span>
            </li>
            <li className={style.list}>
              <img src="/icons/icon_member.svg" alt="" />
              <span>모집 인원</span>
              <span className={style.font_bold}>{data?.headCount}명</span>
            </li>
            <li className={style.list}>
              <img src="/icons/icon_time.svg" alt="" />
              <span> 모집 마감</span>
              <span className={style.font_bold}>
              {dayjs(data?.deadLine).format("MM월 DD일")}
              </span>
            </li>
            <li className={style.list}>
              <div className={style.buttonarea}>
                <div className={style.dead_line}>
                  <span>{isDeadLine(deadLine) ? "모집 마감" : "모집중"}</span>
                </div>
                {currentUser && data?.leader?._id === currentUser?._id ? (
                  <button
                    className={style.application_button}
                    type="button"
                    onClick={() => {
                      router.push(
                        `/mystudy/${data.leader?._id}/applicants/${data.studyName}`
                      );
                    }}
                  >
                    스터디 신청 현황
                  </button>
                ) : (
                  <button
                    className={style.application_button}
                    type="submit"
                    onClick={showModal}
                    // 현재 유저가 해당 모집글 참여 신청자가 아닌경우만 신청
                    disabled={isApplicant as boolean}
                  >
                    {isApplicant === null
                      ? "로딩중..."
                      : (isApplicant as boolean)
                      ? "이미 신청한 스터디"
                      : "스터디 참여 신청"}
                  </button>
                )}
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
            <p>댓글</p>
            <div>
              <CommentForm
                fetcher={postRecruitComment}
                user={{
                  name: currentUser?.name as string,
                  image: currentUser?.image as string,
                }}
                postId={data?._id}
              />
            </div>
            <div>
              <SingleComment
                isToggleCtrl={false}
                postId={data?._id}
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

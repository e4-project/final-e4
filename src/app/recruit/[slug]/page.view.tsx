"use client";
import Link from "next/link";
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import CommentForm from "@/components/Comment/CommentForm";
import { RenderHtmlContext } from "@/components/common/Card";
import CustomModal from "@/components/common/modal/Custom/page";
import modalStyle from "@/components/common/modal/modal.module.css";
import SingleComment from "@/components/Comment/SingleComment";
import { IResponseUser } from "@/interfaces/user";
import {
  loadRecruitComment,
  deleteRecruitComment,
  postRecruitComment,
} from "@/axios/fetcher/recruitComment";
import dayjs from "dayjs";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
import { postApplicantApi } from "@/axios/fetcher/applicant/postApplicantApi";
import {
  deleteRecruitLike,
  postRecruitLikes,
} from "@/axios/fetcher/recruitLikes";
import { isDeadLine } from "@/utils/isDeadLine";
import style from "./recruit.module.css";

interface IProps {
  data: IResponseRecruitPost;
  likesData: any;
}
export default function StudyPageView({ data, likesData }: IProps) {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isApplicant, setIsApplicant] = useState<null | boolean>(null);
  const [isLoadingAppliCant, setIsLoadingAppliCant] = useState(true);
  const [currentUser, setCurrentUser] = useState<IResponseUser | null>(null);
  const [isLikedRecruit, setIsLikedRecruit] = useState(false);
  const [isLoadingLikedRecruit, setLoadingLikedRecruit] = useState(true);
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
      const isApplicantData = data?.applicants.includes(
        currentUser?._id as string
      );
      setIsApplicant(isApplicantData);
      setIsLoadingAppliCant(false);
    }
  }, [currentUser, data]);

  useEffect(() => {
    likesData?.likes?.map((like: any) => {
      if (like.userId === currentUser?._id) {
        setIsLikedRecruit(like.userId === currentUser?._id);
      }
    });
  }, [currentUser?._id, likesData?.likes]);

  const fetchLike = useCallback(async () => {
    if (!isLikedRecruit) {
      await postRecruitLikes(data._id, currentUser?._id as string);
      setLoadingLikedRecruit(false);
      router.refresh();
      return;
    } else {
      await deleteRecruitLike(data._id);
      setLoadingLikedRecruit(false);
      setIsLikedRecruit(false);
      router.refresh();
    }
    if (isLoadingLikedRecruit) return;
  }, [
    currentUser?._id,
    data._id,
    isLikedRecruit,
    isLoadingLikedRecruit,
    router,
  ]);

  const showModal = () => {
    if (isLoadingAppliCant) return; //로딩시 신청 모달창 안나오게
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

  const btnActionCommonUser = (() => {
    if (currentUser) {
      return isLoadingAppliCant ? (
        <span className={style.loading_spinner}></span>
      ) : (isApplicant as boolean) ? (
        "이미 신청한 스터디"
      ) : (
        "스터디 참여 신청"
      );
    } else {
      return isLoadingAppliCant ? (
        <span className={style.loading_spinner}></span>
      ) : (
        "스터디 참여 신청"
      );
    }
  })();

  const isRecruitUserTheCurrentUser =
    currentUser && data?.leader?._id === currentUser?._id;
  console.log(isLikedRecruit);
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
                {isRecruitUserTheCurrentUser ? (
                  <button
                    className={`${style.application_button} ${isLoadingAppliCant && style.loading}`}
                    type="button"
                    onClick={() => {
                      router.push(
                        `/mystudy/me/${data.leader?._id}/applicants/${data._id}`
                      );
                    }}
                  >
                    스터디 신청 현황
                  </button>
                ) : (
                  <button
                    className={`${style.application_button} ${isLoadingAppliCant && style.loading}`}
                    type="submit"
                    onClick={showModal}
                    // 현재 유저가 해당 모집글 참여 신청자가 아닌경우만 신청
                    disabled={isApplicant as boolean}
                  >
                    {btnActionCommonUser}
                  </button>
                )}
                <input
                  className={style.good_check}
                  type="checkbox"
                  checked={isLikedRecruit}
                  name=""
                  id="good"
                />
                <label
                  className={style.good_label}
                  htmlFor="good"
                  onClick={fetchLike}
                >
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
                <div className={style.like_count}>
                  <span>좋아요 {likesData.count}개</span>
                </div>
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

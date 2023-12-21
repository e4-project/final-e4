import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
import { IResponseUser } from "@/interfaces/user";
import { updateStudyRoomUrl } from "@/axios/fetcher/recruit/updateStudyRoomUrl";
import style from "./study_room.module.css";

interface TStudyRoomForm {
  data: any;
  
}

const StudyRoomForm = ({ data }: TStudyRoomForm) => {
  console.log(data)
  const [currentUser, setCurrentUser] = useState<IResponseUser | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [studyUrl, setStudyUrl] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    (async () => {
      if (session) {
        const data = await loadUserApi();
        setCurrentUser(data);
      }
    })();
  }, [session]);

  const onShowInputToggle = () => {
    setShowInput((prev) => !prev);
  };

  const onChangeStudyUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyUrl(e.target.value);
  };

  const onSaveStudyRoormUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (studyUrl) {
      const res = await updateStudyRoomUrl(data?._id, studyUrl);
      console.log({res})
      alert("스터디룸을 생성했습니다.");
      location.reload();
    }
  };

  return (
    <div>
      {data?.leader._id === currentUser?._id && (
        <>
          <button
            className={style.no_studyroom_url}
            onClick={onShowInputToggle}
          >
            스터디룸 생성
          </button>
        </>
      )}
      {showInput && (
        <>
          <div className={style.alert_bg}></div>
          <form
            className={style.form_study_room}
            onSubmit={onSaveStudyRoormUrl}
          >
            <input type="url" onChange={onChangeStudyUrl} />
            <div className={style.button_wrap}>
              <button type="button" onClick={() => setShowInput(false)}>
                취소
              </button>
              <button>생성</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default StudyRoomForm;

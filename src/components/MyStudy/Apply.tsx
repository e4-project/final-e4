import Link from "next/link";
import CancelApplicant from "./CancelApplicant";
import style from "./MyStudy.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteCancelApplicantApi } from "@/axios/fetcher/applicant";

function Apply(props: any) {
  // console.log({ props });
  const { applicant, studyId: study, recognition } = props;
  // console.log({ study, recognition });
  const router = useRouter();
  const session = useSession();

  const onCancel = async (userId: string, recruitid: string) => {
    if (session) {
      await deleteCancelApplicantApi(userId, recruitid);
      router.refresh();
      console.log("신청 취소");
    }
  };
  return (
    <div className={style.section_item}>
      <div className={style.wrap}>
        {recognition !== "승인" ? (
          recognition === "거절" ? (
            <div>
              <p style={{ opacity: 0.5, textDecoration: "line-through" }}>
                {study?.studyName}
              </p>
              <p style={{ opacity: 0.5 }}>승인 거절 😂</p>
            </div>
          ) : (
            /* 신청 취소 */
            <div style={{ display: "flex" }}>
              <p style={{ width: "80%" }}>
                <span style={{ opacity: 0.5 }}>{study?.studyName}</span>
                <CancelApplicant
                  recruitId={study?._id}
                  userId={applicant}
                  onCancel={onCancel}
                />
              </p>
            </div>
          )
        ) : (
          <Link href={`/recruit/${study?._id}`}>
            <p>{study?.studyName}</p>
          </Link>
        )}
      </div>
      <div>
        {recognition !== "승인" ? (
          recognition !== "거절" ? (
            <p>승인 대기 😀</p>
          ) : (
            <p style={{ opacity: 0.5 }}>승인 거절 😂</p>
          )
        ) : (
          <p>승인 완료 😊</p>
        )}
      </div>
    </div>
  );
}

export default Apply;
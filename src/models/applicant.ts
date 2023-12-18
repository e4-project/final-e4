import mongoose, { Schema, Types } from "mongoose";

interface IApplicantEntity {
  applicant: Types.ObjectId;
  studyId: Types.ObjectId;
  message: string;
  recognition: "대기" | "승인" | "거절";
}
//applicant
const ApplicantSchema = new Schema<IApplicantEntity>(
  {
    applicant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    studyId: {
      // 모집공고Id
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
    // 참여 메시지
    message: {
      type: String,
      require: true,
      trim: true,
    },
    // 신청 상태: 대기: 승인
    // 거절은 삭제하기로 함
    recognition: {
      type: String,
      default: "대기",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Applicant =
  mongoose.models.Applicant ||
  mongoose.model<IApplicantEntity>("Applicant", ApplicantSchema);
export default Applicant;

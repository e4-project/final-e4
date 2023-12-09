import mongoose, { Schema, Types } from "mongoose";

interface IApplicant {
  leader: string;
  applicant: Types.ObjectId;
  recruitPostId: Types.ObjectId;
  message: string;
  isRecognition: boolean;
}
//applicant
const ApplicantSchema = new Schema<IApplicant>(
  {
    leader: {
      //모집 공고 유저
      type: String,
      require: true,
      // ref: "User",
    },
    applicant: {
      // 참여 유저
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    recruitPostId: {
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
    // 승인 유무
    isRecognition: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Applicant =
  mongoose.models.Applicant ||
  mongoose.model<IApplicant>("Applicant", ApplicantSchema);
export default Applicant;

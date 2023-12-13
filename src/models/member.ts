import mongoose, { Schema, Types } from "mongoose";

interface IMemberEntity {
  member: Types.ObjectId;
  studyId: Types.ObjectId;
  rel: "leader" | "common";
  start: boolean;
}
//applicant
const MemberSchema = new Schema<IMemberEntity>(
  {
    member: {
      type: Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "User",
    },
    rel: {
      type: String,
      default: "common",
    },
    studyId: {
      // 스터디Id(모집공고Id)
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
    start: {
      // 모집 맴버가 다 모이면 true, 이걸로 스터디 페이지 활성화
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Member =
  mongoose.models.Member ||
  mongoose.model<IMemberEntity>("Member", MemberSchema);
export default Member;

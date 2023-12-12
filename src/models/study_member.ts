import mongoose, { Schema, Types } from "mongoose";

interface IStudyMemberEntity {
  studyId: Types.ObjectId;
  userId: Types.ObjectId;
  rel: "팀원" | "팀장";
}

const StudyMemberSchema = new Schema<IStudyMemberEntity>({
  studyId: {
    type: Schema.Types.ObjectId,
    ref: "RecruitPost",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rel: {
    type: String,
    default: "팀장", // 스터디 모집시 팀장인 유저를 먼저 등록.
  },
});

const StudyMember =
  mongoose.models.StudyMember ||
  mongoose.model<IStudyMemberEntity>("StudyMember", StudyMemberSchema);
export default StudyMember;

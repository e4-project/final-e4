import mongoose, { Schema, Types } from "mongoose";

interface IRecruitPostEntity {
  //reuest
  /* 교재 정보 */
  material: string; // 강의|수업등의 교재 이름
  materialUrl: string; // 교재 정보 링크
  materialType: string; // 교재 유형

  /* 스터디 모임 정보 */
  leader: Types.ObjectId; //스터디장
  applicants: Object; //참여자 목록
  studyKeyword: string; //스터디 주제
  duration: string; // 스터디 기간
  headCount: number; //모집 인원
  deadLine: string; // 모집 마감일
  studyName: string; //스터디 모임 이름
  content: string; // 스터디 소개
  weekGoal: Object; // 스터디 진행사항
  studyNoteContents: Object; // 스터디 노트 정보
}

const RecruitPostSchema = new Schema<IRecruitPostEntity>(
  {
    leader: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    applicants: {
      type: [String],
      required: true,
      ref: "User",
      default: [],
    },
    studyKeyword: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    headCount: {
      type: Number,
      require: true,
    },
    deadLine: {
      type: String,
    },
    studyName: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    material: {
      type: String,
      require: true,
    },
    materialUrl: {
      type: String,
      require: true,
    },
    materialType: {
      type: String,
      require: true,
    },
    weekGoal: [
      {
        _id: false,
        week: String,
        content: String,
      },
    ],
    studyNoteContents: [
      {
        _id: false,
        week: String,
        contents: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RecruitPost =
  mongoose.models.RecruitPost ||
  mongoose.model<IRecruitPostEntity>("RecruitPost", RecruitPostSchema);
export default RecruitPost;

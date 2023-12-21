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
  rejectedApplications: Object; // 거절된 참여자 목록
  studyKeyword: string; //스터디 주제
  duration: string; // 스터디 기간
  headCount: number; //모집 인원
  deadLine: string; // 모집 마감일
  studyName: string; //스터디 모임 이름
  content: string; // 스터디 소개
  weekGoal: Object; // 스터디 진행사항
  start: boolean;
  studyRoomUrl: string;//스터디룸 url
}

const RecruitPostSchema = new Schema<IRecruitPostEntity>(
  {
    leader: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    applicants: {
      type: Array<Schema.Types.ObjectId>,
      required: true,
      ref: "User",
      default: [],
    },
    rejectedApplications: {
      type: Array<Schema.Types.ObjectId>,
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
    studyRoomUrl: {
      type: String,
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
    start: {
      // 모집 맴버가 다 모이면 true, 이걸로 스터디 페이지 활성화
      type: Boolean,
      default: false,
    },
   
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

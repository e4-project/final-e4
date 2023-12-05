import mongoose, { Schema, Types } from "mongoose";
/* 
{
   insert db
    "material": "[코딩애플] React 리액트 기초부터 쇼핑몰 프로젝트까지!",
    "materialUrl": "https://codingapple.com/course/react-basic",
    "materialType": "동영상 강의",
    "applicants": [],
    "leader": "홍길동",
    "studyKeyword": "리액트",
    "duration": "3개월",
    "headCount": 5,
    "deadLine": "12/04/2023",
    "studyName": "리액트 스터디 모임",
    "content": "리액트 맨땅부터 헤딩하실 분 모집합니다."
}

*/
export interface IRecruitPost {
  /* 교재 정보 */
  material: string; // 강의|수업등의 교재 이름
  materialUrl: string; // 교재 정보 링크
  materialType: string; // 교재 유형

  /* 스터디 모임 정보 */
  leader: string; //스터디장
  applicants: [string]; //참여자 목록
  studyKeyword: string; //스터디 주제
  duration: string; // 스터디 기간
  headCount: number; //모집 인원
  deadLine: string; // 모집 마감일
  studyName: string; //스터디 모임 이름
  content: string; // 스터디 소개
}

const RecruitPostSchema = new Schema<IRecruitPost>(
  {
    leader: {
      type: String,
      require: true,
      // ref: "User",
    },
    applicants: {
      type: [String],
      required: true,
      // ref: "User",
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RecruitPost =
  mongoose.models.RecruitPost ||
  mongoose.model<IRecruitPost>("RecruitPost", RecruitPostSchema);
export default RecruitPost;

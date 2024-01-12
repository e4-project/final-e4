export interface IRecruitPost {
  //reuest
  /* 교재 정보 */
  material: string; // 강의|수업등의 교재 이름
  materialUrl: string; // 교재 정보 링크
  materialType: string; // 교재 유형

  /* 스터디 모임 정보 */
  leader: string; //스터디장
  applicants: Object; //참여자 목록
  studyKeyword: string; //스터디 주제
  duration: string; // 스터디 기간
  headCount: number; //모집 인원
  deadLine: string; // 모집 마감일
  studyName: string; //스터디 모임 이름
  content: string; // 스터디 소개
  weekGoal: [string]; // 스터디 주차별 목표
}

export interface IResponseRecruitPost {
  /* 교재 정보 */
  _id: string;
  material: string; // 강의|수업등의 교재 이름
  materialUrl: string; // 교재 정보 링크
  materialType: string; // 교재 유형

  /* 스터디 모임 정보 */
  leader: {
    _id: string;
    name: string;
    image: string;
  }; //스터디장
  applicants: Array<string>; //참여자 목록
  rejectedApplications: Array<string>;
  studyKeyword: string; //스터디 주제
  duration: string; // 스터디 기간
  headCount: number; //모집 인원
  deadLine: string; // 모집 마감일
  studyName: string; //스터디 모임 이름
  content: string; // 스터디 소개
  weekGoal: [string]; // 스터디 주차별 목표
  createdAt: string;
  start: boolean;
}

export type IMystudy = Pick<IResponseRecruitPost, "_id" | "leader" | "studyName" | "start"> 

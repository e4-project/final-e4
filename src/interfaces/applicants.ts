export interface IApplicant {
  _id: string;
  applicant: { _id: string; name: string, image: string };
  studyId: string;
  message: string;
  recognition: string;
  createdAt: string;
}

export interface IResponseApplicantStatus {
  _id: string;
  leader: string;
  studyKeyword: string;
  duration: string;
  headCount: number;
  deadLine: string;
  studyName: string;
  material: string;
  createdAt: string;
  start: boolean;
  applicants: Array<IApplicant>;
}

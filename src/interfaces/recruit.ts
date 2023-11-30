

export interface IRecruit{
  id:number;      // 글 번호
  Choice:string;  // 동영상 강의 책 온라인 문제집
  textbook:string; // 책이름
  title:string;    // 글 제목
   date: string; //현재 날짜
   deadline: string|Date; //마감 날짜


   cal:string;  //가짜 키워드

   //type ReactNode에는 Date타입이 없어서 
   //ReactElement 타입에 Date를 넣으면 오류난다.
}


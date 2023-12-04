import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const studydb = [

  {  
      id:1,
      Choice:"동영상 강의",
      textbook:"[코딩애플] React 리액트 기초부터 쇼핑몰 프로젝트까지!",
      title: '어둠의 생코 코딩애플님 강의 들으면서 숙제하고 리액트 기초탄탄 쌓으실 분 함께 공부해요',
      date: "2023.10.22",
      cal:'프론트엔드'
  },
  {  
    id:2,
    Choice:"책",
    textbook:"타입스크립트 교과서",
    title: '타입스크립트 같이 공부해요!타스가 부족한 주니어 개발자들 다같이 모여서 이펙티브 타입스크립트 책을 읽으며 공부해요',
    date: "2023.11.14",
    cal:'프론트엔드'
},
{  
  id:3,
  Choice:"책",
  textbook:"생활코딩! 자바 프로그래밍 입문",
  title: '자바 기초부터 같이 하실분!',
  date: "2023.11.18",
  cal:'프로그래밍 '
},
{  
  id:4,
  Choice:"책",
  textbook:"이것이 자바다",
  title: '자바 공부 할분!!',
  date: "2023.09.25",
  cal:'프로그래밍'
},
{  
  id:5,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:6,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:7,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:8,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:9,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:10,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:11,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:12,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:13,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:14,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:15,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:16,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:17,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "모집 마감",
  cal:'문제집'
},
{  
  id:18,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:19,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
{  
  id:20,
  Choice:"온라인문제집",
  textbook:"Java 문제집",
  title: '자바 문제 같이 푸실분!!',
  date: "2023.04.30",
  cal:'문제집'
},
];

export const GET = async (request: NextApiRequest) => {
  try {
    return NextResponse.json(studydb);
  } catch (error: any) {
    console.error(error);
  }
};
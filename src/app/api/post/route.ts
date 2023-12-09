import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/post";
import connectDB from "@/config/db/connectDB";
import StudyPost from "@/models/study_post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// withErrorHandling 함수는 데이터 유효성 검사와 오류 처리를 담당
const withErrorHandling =
  (fn: (data: any) => Promise<NextResponse>) => async (req: NextRequest) => {
    try {
      // 요청으로부터 데이터를 추출합니다.
      const data = await req.json();

      // 데이터의 유효성을 검사
      if (
        !data.item_name ||
        !data.page_link ||
        !data.study_topic ||
        !data.study_duration ||
        !data.study_capacity ||
        !data.study_deadline ||
        !data.study_name
      ) {
        // 유효하지 않은 데이터인 경우, 400 상태 코드와 함께 오류 메시지를 반환
        return NextResponse.json({ msg: "Invalid data" }, { status: 400 });
      }

      // 데이터가 유효한 경우, fn 함수를 실행
      return await fn(data);
    } catch (error) {
      // fn 함수 실행 중 오류가 발생한 경우, 500 상태 코드와 함께 오류 메시지를 반환
      return NextResponse.json({ msg: "error message!" }, { status: 500 });
    }
  };

// POST 함수는 새로운 Post를 생성하고 저장하는 로직을 담당
export const POST = withErrorHandling(async (data) => {
  // 세션 정보를 가져옵니다.
  let session = await getServerSession(authOptions);
  if (session) {
    // 세션 정보가 있는 경우, 데이터의 author 필드를 세션의 사용자 이메일로 설정
    data.author = session?.user?.email;
  }
  console.log(session);
  console.log(data);
  // 데이터베이스에 연결
  await connectDB();
  // 새로운 Post 객체를 생성
  const post = new Post(data);
  // Post 객체를 저장.
  const result = await post.save();
  // 리디렉션 URL을 포함한 JSON 응답을 반환
  return NextResponse.json({ redirectURL: "/" });
});

// GET 함수는 모든 Post를 조회하는 로직을 담당
export const GET = async (req: NextRequest) => {
  try {
    // 데이터베이스에 연결
    await connectDB();
    // 모든 Post를 조회
    const post = await Post.find({});
    // 조회한 Post를 반환
    return NextResponse.json(post);
  } catch (error) {
    // Post 조회 중 오류가 발생한 경우, 500 상태 코드와 함께 오류 메시지를 반환
    return NextResponse.json(error, { status: 500 });
  }
};

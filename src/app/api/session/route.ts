import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";

// GET 함수는 세션 정보를 조회하는 로직을 담당
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // 세션 정보 가져오기
  let session = await getServerSession(authOptions);
  if (session) {
    // 세션 정보가 있는 경우, 세션 정보를 콘솔에 출력하고, 200 상태 코드와 함께 세션 정보를 반환
    console.log(session);
    res.status(200).json({ session });
  } else {
    // 세션 정보가 없는 경우, 200 상태 코드와 함께 "No session" 메시지를 반환
    res.status(200).json({ session: "No session" });
  }
}

import { ObjectId } from "mongodb";
import Post from "@/models/post"; // Mongoose Post 모델을 가져옵니다.
import connectDB from "@/config/db/connectDB";
import EditForm from "@/app/edit/EditForm";
export default async function Edit(props: any) {
  await connectDB();

  let result = await Post.findById(new ObjectId(props.params.id));

  const simpleResult = JSON.parse(JSON.stringify(result));
  // 객체 전달이 길면 오류가 난다. 그래서 JSON으로 변환해서 전달
  console.log(simpleResult);
  return (
    <div>
      <EditForm result={simpleResult} />
    </div>
  );
}

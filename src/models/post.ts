import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  item_name: { type: String, required: true },
  page_link: { type: String, required: true },
  study_topic: { type: String, required: true },
  study_duration: { type: String, required: true },
  study_capacity: { type: String, required: true },
  study_deadline: { type: String, required: true },
  study_name: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// 이미 "posts" 모델이 컴파일되었는지 확인하고, 그렇지 않은 경우에만 모델을 컴파일합니다.
const Post = mongoose.models.posts || mongoose.model("posts", PostSchema);

export default Post;

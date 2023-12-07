import mongoose, { Schema, Types } from "mongoose";

interface IStudyPost {
  user: Types.ObjectId;
  studyId: Types.ObjectId;
  likes: Types.ObjectId;
  views: number;
  content: string;
}

const StudyPostSchema = new Schema<IStudyPost>(
  {
    // < -- 아래 주석은 구현후 활성화 -->
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    studyId: {
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
    // likes: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Likes",
    // },
    // views: {
    //   type: Number,
    //   default: 0,
    // },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const StudyPost =
  mongoose.models.StudyPost ||
  mongoose.model<IStudyPost>("StudyPost", StudyPostSchema);
export default StudyPost;

import mongoose, { Schema, Types } from "mongoose";

interface IStudyPost {
  author: Types.ObjectId;
  studyId: Types.ObjectId;
  likes: Types.ObjectId;
  views: number;
  contents: string;
}

const StudyPostSchema = new Schema<IStudyPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    studyId: {
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Likes",
    },
    views: {
      type: Number,
      default: 0
    },
    contents: {
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

const StudyPost = mongoose.model<IStudyPost>("StudyPost", StudyPostSchema);
export default StudyPost;

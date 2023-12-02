import mongoose, { Schema, Types } from "mongoose";

interface IComment {
  author: Types.ObjectId;
  recruitPostId: Types.ObjectId;
  studyPostId: Types.ObjectId;
  contents: string;
  parentId: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    recruitPostId: {
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
    studyPostId: {
      type: Schema.Types.ObjectId,
      ref: "StudyPost",
    },
    contents: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;

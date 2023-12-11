import mongoose, { Schema, Types } from "mongoose";

interface ICommentEntity {
  author: Types.ObjectId;
  recruitPostId: Types.ObjectId;
  studyPostId: Types.ObjectId;
  content: string;
  parentId: Types.ObjectId;
}

const CommentSchema = new Schema<ICommentEntity>(
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
    content: {
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
  mongoose.models.Comment || mongoose.model<ICommentEntity>("Comment", CommentSchema);
export default Comment;

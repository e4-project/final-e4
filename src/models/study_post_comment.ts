import mongoose, { Schema, Types } from "mongoose";

interface ICommentEntity {
  user: Types.ObjectId;
  studyPostId: Types.ObjectId;
  content: string;
}

const CommentSchema = new Schema<ICommentEntity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
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

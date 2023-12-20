import mongoose, { Schema, Types } from "mongoose";

interface IStudyPostCommentEntity {
  user: Types.ObjectId;
  studyId: Types.ObjectId;
  studyPostId: Types.ObjectId;
  content: string;
}

const StudyPostCommentSchema = new Schema<IStudyPostCommentEntity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    studyId: {
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

const StudyPostComment =
  mongoose.models.StudyPostComment ||
  mongoose.model<IStudyPostCommentEntity>(
    "StudyPostComment",
    StudyPostCommentSchema
  );
export default StudyPostComment;

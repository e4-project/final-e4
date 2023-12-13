import mongoose, { Schema, Types } from "mongoose";

interface IRecruitCommentEntity {
  user: Types.ObjectId;
  studyId: Types.ObjectId;
  content: string;
  parentId: Types.ObjectId;
}

const RecruitCommentSchema = new Schema<IRecruitCommentEntity>(
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

const RecruitComment =
  mongoose.models.RecruitComment || mongoose.model<IRecruitCommentEntity>("RecruitComment", RecruitCommentSchema);
export default RecruitComment;

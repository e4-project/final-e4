import mongoose, { Schema, Types } from "mongoose";

interface ILikeEntity {
  user: Types.ObjectId;
  studyId: Types.ObjectId;
  commentsId: Types.ObjectId;
  contents: string;
  LikesType: "studyId" | "Comment";
}

const LikesSchema = new Schema<ILikeEntity>(
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
    commentsId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    LikesType: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Likes =
  mongoose.models.Likes || mongoose.model<ILikeEntity>("Likes", LikesSchema);
export default Likes;

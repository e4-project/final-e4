import mongoose, { Schema, Types } from "mongoose";

interface RecruitLikeEntity {
  userId: string;
  recruitId: string;
  user: Types.ObjectId;
  recruit: Types.ObjectId;
}
//applicant
const RecruitLikeSchema = new Schema<RecruitLikeEntity>(
  {
    userId: {
      type: String,
    },
    recruitId: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    recruit: {
      type: Schema.Types.ObjectId,
      ref: "RecruitPost",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

RecruitLikeSchema.index({ userId: 1, recruitId: 1 }, { unique: true });

const RecruitLike =
  mongoose.models.RecruitLike ||
  mongoose.model<RecruitLikeEntity>("RecruitLike", RecruitLikeSchema);
export default RecruitLike;

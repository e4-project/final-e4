import mongoose, { Schema, Types } from "mongoose";

interface IStudyPostEntity {
  user: Types.ObjectId;
  studyId: Types.ObjectId;
  content: string;
}

const StudyPostSchema = new Schema<IStudyPostEntity>(
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
  mongoose.model<IStudyPostEntity>("StudyPost", StudyPostSchema);
export default StudyPost;

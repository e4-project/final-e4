import mongoose, { Schema, Types } from "mongoose";

interface IStudyNoteEntity {
  author: Types.ObjectId;
  studyId: Types.ObjectId;
  week: "1주차" | "2주차" | "3주차" | "4주차" | "5주차";
  contents: string;
}

const StudyNoteSchema = new Schema<IStudyNoteEntity>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  studyId: {
    type: Schema.Types.ObjectId,
    ref: "RecruitPost",
  },
  week: {
    type: String,
    require: true,
    default: "1주차",
  },
  contents: {
    type: String,
    require: true,
  },
});

const StudyNote =
  mongoose.models.StudyNote ||
  mongoose.model<IStudyNoteEntity>("StudyNote", StudyNoteSchema);
export default StudyNote;

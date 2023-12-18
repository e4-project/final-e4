import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkInTime: { type: Date, default: Date.now },
});

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);

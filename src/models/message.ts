import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;

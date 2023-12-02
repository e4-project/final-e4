import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  nickName: string;
  token: string;
  snsType: string;
  imgPath: string;
  isLimited: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
    },
    nickName: {
      type: String,
    },
    token: {
      type: String,
      require: true,
    },
    snsType: {
      type: String,
      require: true,
    },
    imgPath: {
      type: String,
    },
    isLimited: {
      //신고받은 상태 신고됨: true
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;

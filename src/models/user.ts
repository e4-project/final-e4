import mongoose, { Schema } from "mongoose";
interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  changename: boolean;
}
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
    },
    image: {
      //신고받은 상태 신고됨: true
      type: String,
    },
    changename: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;

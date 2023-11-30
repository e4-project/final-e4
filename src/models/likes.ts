import mongoose, { Schema, Types } from "mongoose";

interface ILike {
  author: Types.ObjectId;
  contentsId: Types.ObjectId;
  commentsId: Types.ObjectId;
  contents: string;
  LikesType: "Contents" | "Comment";
}

const LikesSchema = new Schema<ILike>(
  {
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    contentsId: {
      type: Schema.Types.ObjectId,
      ref: "Contents",
    },
    commentsId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    LikesType: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Likes = mongoose.model<ILike>("Likes", LikesSchema);
export default Likes;

import mongoose from "mongoose";
const DB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) {
  // 캐시되지 않았다면, global 변수에 다시 캐싱
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .set("debug", true)
      .set("strictQuery", false) // mongoose 버전 다운으로 인한 변경 .set이 객체를 인수로 못받음
      .connect(`${DB_URI}`, { dbName: "e4", maxPoolSize: 10 }) //최대 pool을 10개로 제한<connect pool>
      .then((mongoose) => mongoose)
      .catch((error) => {
        throw "Error connecting to Database" + error.message;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

mongoose.connection.on("connected", () => {
  console.log("DB connected😊");
});

mongoose.connection.on("disconnected", connectDB);

export default connectDB;

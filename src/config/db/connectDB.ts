import mongoose from "mongoose";
const DB_URI = process.env.DATABASE_URL;
let cached = global.mongoose;

if (!cached) {
  // 캐시되지 않았다면, global 변수에 다시 캐싱
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`, { dbName: "e4" })
      .then((mongoose) => mongoose)
      .catch((error) => {
        throw new Error("Error connecting to Database" + error.message);
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

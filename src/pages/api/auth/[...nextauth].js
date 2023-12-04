import connectDB from "@/config/db/connectDB";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI),
  providers: [
    GithubProvider({
      clientId: "d89cc9b0b347e69a7ad3",
      clientSecret: "640a92b95fdcceaf43a00f3fba37ff1db68a7a15",
    }),
  ],
  secret: "qwer1234",
};
export default NextAuth(authOptions);

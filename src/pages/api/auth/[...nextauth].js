import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "d89cc9b0b347e69a7ad3",
      clientSecret: "640a92b95fdcceaf43a00f3fba37ff1db68a7a15",
    }),
    KakaoProvider({
      clientId: "99eff536faec341d98a8471e71b08e27",
      clientSecret: "ZA2cghpHGva3DpwFGFtZeZrW02eRbbMp",
    }),
    GoogleProvider({
      clientId:
        "596916716907-sfa1p3mj7c4bfns921obipclfch5vh22.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  adapter: MongooseAdapter(process.env.MONGODB_URI),
  secret: "qwer1234",
};

export default NextAuth(authOptions);

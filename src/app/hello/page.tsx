import { getHello } from "@/axios/fetcher/getHello";
import React from "react";

const Page = async () => {
  const { data } = await getHello();
  return <div>{data.msg}</div>;
};

export default Page;

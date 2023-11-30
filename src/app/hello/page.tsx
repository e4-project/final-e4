import { getHello } from "@/axios/fetcher/getHello";
import React from "react";

const Page = async () => {
    const msg = await getHello();
    console.log(msg);
    return <div>hello</div>
};
export default Page;

import React from "react";
import style from "./introduce.module.css";
import RecruitPost from "@/models/recruit_post";

const page = async (props: any) => {
  const post = await RecruitPost.findOne(
    { _id: props.params.id },
    { _id: 0, content: 1 }
  );
  if (post) {
    const result = JSON.parse(JSON.stringify(post.toObject()));
    return <div dangerouslySetInnerHTML={{ __html: result.content }} />;
  } else {
    return <div>Post not found</div>;
  }
};

export default page;

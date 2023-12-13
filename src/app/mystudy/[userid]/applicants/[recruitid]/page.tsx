import React from "react";
import ApplicantsView from "./page.view";
// path: ex) /mystudy/이동현/applicants/6576feeeea262d2cf9fd9a8d
const Page = async ({ params }: { params: { username: string, recruitid: string } }) => {
  console.log({u: params.username, ri: params.recruitid})
  return (
    <div>
      <ApplicantsView />
    </div>
  );
};

export default Page;

import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitOneApi";
import StudyPageView from "./page.view";
import { IResponseRecruitPost } from "@/interfaces/recruit";

export default async function Page({ params }: { params: { slug: string } }) {
  const data: IResponseRecruitPost = await loadRecruitOneByIdApi(params.slug);
  return (
    <div>
      <StudyPageView data={data}/>
    </div>
  );
}

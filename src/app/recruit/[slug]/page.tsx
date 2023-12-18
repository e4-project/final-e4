import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitOneApi";
import StudyPageView from "./page.view";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import { loadRecruitLikeApi } from "@/axios/fetcher/recruitLikes";

export default async function Page({ params }: { params: { slug: string } }) {
  const data: IResponseRecruitPost = await loadRecruitOneByIdApi(params.slug);
  const likesData = await loadRecruitLikeApi(params.slug)
  console.log({likesData})
  return (
    <div>
      <StudyPageView data={data} likesData={likesData}/>
    </div>
  );
}

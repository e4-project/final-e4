import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitOneApi";
import StudyPageView from "./page.view";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import { loadRecruitLikeApi } from "@/axios/fetcher/recruitLikes";
import { loadMemberApi } from "@/axios/fetcher/recruit/loadMemberApi";
export default async function Page({ params }: { params: { slug: string } }) {
  const data: IResponseRecruitPost = await loadRecruitOneByIdApi(params.slug);
  const likesData = await loadRecruitLikeApi(params.slug)
  const memebers = await loadMemberApi(params.slug);
  return (
    <div>
      <StudyPageView data={data} likesData={likesData} members={memebers}/>
    </div>
  );
}

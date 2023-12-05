import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitByIdApi";
import StudyPageView from "./page.view";
import { IRequestRecruitPost } from "@/interfaces/recruit";

export default async function Page({ params }: { params: { slug: string } }) {
  const data: IRequestRecruitPost = await loadRecruitOneByIdApi(params.slug);

  return (
    <div>
      <StudyPageView data={data}/>
    </div>
  );
}

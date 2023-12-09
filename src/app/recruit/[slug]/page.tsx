import { loadRecruitOneByIdApi } from "@/axios/fetcher/recruit/loadRecruitByIdApi";
import StudyPageView from "./page.view";
import { IResponseRecruitPost } from "@/interfaces/recruit";

export default async function Page({ params }: { params: { slug: string } }) {
  const data: IResponseRecruitPost = await loadRecruitOneByIdApi(params.slug);
  console.log({studypagePage_slug: params.slug})
  console.log({studypagePage_data: data})
  return (
    <div>
      <StudyPageView data={data}/>
    </div>
  );
}

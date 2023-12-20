// 프론트 서버
import BoardView from "./page.view";
import { loadBoardApi } from "@/axios/fetcher/board";
import { IResponseBoard } from "@/interfaces/study_board";

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const studyId = params.id
    const data: IResponseBoard[] = await loadBoardApi(studyId);
    return <BoardView data={data} studyId={studyId}/>;
  } catch(error) {
    console.error(error)
    throw new Error('error loading board');
  }
};

export default Page;

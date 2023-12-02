// 프론트 서버
import { loadBoardApi } from "@/axios/fetcher/board/loadBoardApi";
import BoardView, { IResponseBoard } from "./page.view";

const Page = async () => {
  try {
    const data: IResponseBoard[] = await loadBoardApi();
    return <BoardView data={data} />;
  } catch(error) {
    console.error(error)
    throw new Error('error loading board');
  }
};

export default Page;

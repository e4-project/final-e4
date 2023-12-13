import React from 'react';
import NoteView from './page.view';
import { studyNoteApi } from '@/axios/fetcher/note/study_note';
import { IResponseNote } from '@/interfaces/study_note';

const Page = async () => {
    const data: IResponseNote[] = await studyNoteApi();
    console.log(data);
    return(<NoteView />)
}

export default Page;
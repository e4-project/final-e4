export interface IResponseNote {
    _id: string;
    author: {
        _id: string;
        name: string;
        image: string;
    };
    studyId: {
        _id: string;
        leader: string;
        studyKeyword: string;
    };
    week: string;
    contents: string;
}
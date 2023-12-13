import { api } from "@/axios/api";

export const studyInfoApi = async () => {
    try {
        const { data } = await api.get("/study/page.view");
        return data;
    } catch (err: any) {
        console.error(err);
    }
};

import { baseUrl } from "@/constants/url";
import axios from "axios";

export const studyInfoApi = async () => {
    try {
        const {data} = await axios.get(
        `${baseUrl}/api/study/studyinfo`
        );
        return data;
    } catch (err: any) {
        console.error(err)
    } 
};

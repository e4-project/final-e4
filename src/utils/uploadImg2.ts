import axios from "axios";
const CLOUDINARY_NAME = "dudacdjnd";
const PRESETS_NAME = "oqdugyzh";

export const uploadImg2 = async (originFileName: File) => {
  try {
    const formData = new FormData();
    formData.append("file", originFileName);
    formData.append("upload_preset", PRESETS_NAME);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log("이미지 전송 실패.", error);
  }
};

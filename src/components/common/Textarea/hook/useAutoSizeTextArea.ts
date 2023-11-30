import { useEffect } from "react";

/**
 * @name useAutoSizeTextArea
 * @author 이동현
 * @desc Textarea 요소의 내부 컨텐츠 크기에 맞게 높이를 조정해줍니다.
 */

export const useAutoSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "auto";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

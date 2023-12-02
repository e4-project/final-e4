import React, {
  forwardRef,
  ForwardedRef,
  DetailedHTMLProps,
  TextareaHTMLAttributes
} from "react";
import { useAutoSizeTextArea } from "./hook/useAutoSizeTextArea";
import style from './textarea.module.css'

type commonTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

/**
 * @name Textarea
 * @author 이동현
 * @desc Textarea 컴포넌트
 */
const Textarea = (
  { value, ...rest }: commonTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const textAreaElment = ref as React.RefObject<HTMLTextAreaElement>;
  useAutoSizeTextArea(textAreaElment?.current, value as string);
  return <textarea ref={ref} {...rest} wrap="hard" cols={34} className={style.textarea_interface}/>;
};

export default React.memo(forwardRef(Textarea));

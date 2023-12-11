import { DetailedHTMLProps, ButtonHTMLAttributes, FC } from "react";
import style from "./button.module.css";

type commonButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface customType {
  text: string;
  size?: string | number;
  bgColor?: string;
  color?: string;
}

/**
 * @name Button
 * @author 이동현
 * @desc 커스텀 버튼 컴포넌트입니다, bgColor, size(font-size), color, text를
 *  지정할 수 있습니다. 
 *  그 외 스타일은 className(추천), style 속성을 통해 수정해주세요.
 */
const Button: FC<customType & commonButtonProps> = ({
  className = '',
  text,
  size = 16,
  bgColor,
  color,
  ...rest
}) => {
  const customStyle = {
    backgroundColor: bgColor,
    fontSize: `${typeof size === "number" ? size + "px" : size}`,
    color,
  };
  return (
    <button
      className={`${style.button} ${className}`}
      style={customStyle}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;

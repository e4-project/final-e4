import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import style from "../recruitList.module.css";

interface IProps {
  text: string;
  onHandler: ((active: boolean) => void) | null;
}
const FilteringBtnItem = ({ text, onHandler }: IProps) => {
 const [active, setActive] = useState(false);
  const onActive = () => {
    console.log(active)
    setActive((prev) => !prev);
  };
  useEffect(() => {
    onHandler && onHandler(active);
  }, [active, onHandler]);
  return (
    <li>
      <Button
        className={`${style.Button} ${active && style.selected}`}
        size={18}
        text={text}
        onClick={onActive}
      />
    </li>
  );
};

export default FilteringBtnItem;

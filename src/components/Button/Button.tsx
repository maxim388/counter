import { useState } from "react";
import style from "./Button.module.css";

type ButtonPropsType = {
  title: string;
  onClick: () => void;
  disabled: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({
  title,
  onClick,
  disabled,
}) => {
  return (
    <button className={style.general} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

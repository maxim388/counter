import { useState } from "react";
import style from "./Counter.module.css";
import { Button } from "../Button/Button";

export type CounterPropsType = {
  count: number;
  maxValue: number;
  startValue: number;
  disabledInc: boolean;
  disabledReset: boolean;
  error: string;
  onClickInc: () => void;
  onClickReset: () => void;
};

export const Counter: React.FC<CounterPropsType> = ({
  count,
  maxValue,
  startValue,
  disabledInc,
  disabledReset,
  error,
  onClickInc,
  onClickReset,
}) => {
  return (
    <div className={style.wrapper}>
      {error ? (
        <div className={`${style.red} ${style.error}`}>{error}</div>
      ) : (
        <div className={`${count === maxValue ? style.red : ""}`}>{count}</div>
      )}
      <Button title={"INC"} onClick={onClickInc} disabled={disabledInc} />
      <Button title={"RESET"} onClick={onClickReset} disabled={disabledReset} />
    </div>
  );
};

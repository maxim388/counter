import { ChangeEvent, useState } from "react";
import style from "./Settings.module.css";
import { Button } from "../Button/Button";

export type SettingsPropsType = {
  maxValue: number;
  startValue: number;
  disabledSet: boolean;
  error: string;
  onClickSet: () => void;
  onChangeMaxValueHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeStartValueHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Settings: React.FC<SettingsPropsType> = ({
  maxValue,
  startValue,
  disabledSet,
  error,
  onClickSet,
  onChangeMaxValueHandler,
  onChangeStartValueHandler,
}) => {
  let classNameInput =
    `${style.input} ` + error === "Incorrect value!" ? `${style.error}` : "";
  return (
    <div className={style.wrapper}>
      <div className={style.styleInputSettings}>
        <div>max value:</div>
        <input
          className={classNameInput}
          defaultValue={maxValue}
          type={"number"}
          onChange={(e) => onChangeMaxValueHandler(e)}
        />
      </div>
      <div className={style.styleInputSettings}>
        <div>start value:</div>
        <input
          className={classNameInput}
          defaultValue={startValue}
          type={"number"}
          onChange={(e) => onChangeStartValueHandler(e)}
        />
      </div>
      <Button title={"SET"} onClick={onClickSet} disabled={disabledSet} />
    </div>
  );
};

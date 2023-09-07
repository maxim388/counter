import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./components/Counter/Counter";
import { Settings } from "./components/Settings/Settrings";

// Кнопка inc дизайбл при 5 (установленное значение max) +
// Число в окошке становиться красным при 5 (установленное значение max) +
// Кнопка reset дизайбл при 0 (установленное значение min) +
// Кнопка inc нажата + 1 +
// Кнопка reset нажата сброс к (установленное значение min) +
// При изменении значения min и max текст в Counter " enter values and press `set` "
// При изменении значения min и max дизайбл кнопок inc и reset
// Start value нельзя изменять на отрицательные числа (красным текст в Counter " Incorrect value! ") + дизайбл всех кнопок
// Max value нельзя изменять на идентичное Start value (красным текст в Counter " Incorrect value! ") + дизайбл всех кнопок
// Button универсальная +
//
//
// ________________________________
//
// Объеденить (наложить) калькулятор и настройки
//
//

export const App: React.FC<{}> = () => {
  type InitialStatetype = {
    inc: boolean;
    reset: boolean;
    set: boolean;
  };
  const initialState: InitialStatetype = {
    inc: false,
    reset: true,
    set: true,
  };

  const [count, setCount] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(5);
  const [startValue, setStartValue] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [disable, setDisable] = useState(initialState);

  useEffect(() => {
    let valueAsString = localStorage.getItem("counterValue");
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      setCount(newValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("counterValue", JSON.stringify(count));
  }, [count]);

  const onClickInc = () => {
    let newCount = count + 1;
    setCount(newCount);

    if (newCount === maxValue) setDisable((prev) => ({ ...prev, inc: true }));
    if (newCount !== startValue)
      setDisable((prev) => ({ ...prev, reset: false }));
  };

  const onClickReset = () => {
    setCount(startValue);
    setDisable({ ...disable, reset: true, inc: false });
  };

  const onClickSet = () => {
    setCount(startValue);
    setError("");
    setDisable({ inc: false, reset: true, set: true });
  };

  const errorHandler = (value: number, type: string): boolean => {
    const error = (): boolean => {
      setError("Incorrect value!");
      setDisable({ inc: true, reset: true, set: true });
      return true;
    };
    switch (type) {
      case "max": {
        if (value <= startValue) return error();
        if (value < 0) return error();
        return false;
      }
      case "start": {
        if (value < 0) return error();
        if (value >= maxValue) return error();
        return false;
      }
      default:
        return false;
    }
  };

  const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.currentTarget.value;
    let error = errorHandler(value, "max");
    generaOnChangeValetHandler(error, value, setMaxValue);
  };
  const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.currentTarget.value;
    let error = errorHandler(value, "start");
    generaOnChangeValetHandler(error, value, setStartValue);
  };

  const generaOnChangeValetHandler = (
    error: boolean,
    value: number,
    callBack: (value: number) => void
  ) => {
    if (error) {
      setError("Incorrect value!");
    } else {
      callBack(value);
      setError("enter values and press `set`");
      setDisable({ inc: true, reset: true, set: false });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Settings
          maxValue={maxValue}
          startValue={startValue}
          disabledSet={disable.set}
          error={error}
          onClickSet={onClickSet}
          onChangeMaxValueHandler={onChangeMaxValueHandler}
          onChangeStartValueHandler={onChangeStartValueHandler}
        />
        <Counter
          count={count}
          maxValue={maxValue}
          startValue={startValue}
          disabledInc={disable.inc}
          disabledReset={disable.reset}
          error={error}
          onClickInc={onClickInc}
          onClickReset={onClickReset}
        />
      </header>
    </div>
  );
};

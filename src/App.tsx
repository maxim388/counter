import React, { ChangeEvent, useEffect } from "react";
import "./App.css";
import { Counter } from "./components/Counter/Counter";
import { Settings } from "./components/Settings/Settrings";
import { useDispatch, useSelector } from "react-redux";
import {
  StateType,
  setCountAC,
  setDisableAC,
  setErrorAC,
  setMaxValueAC,
  setStartValueAC,
} from "./store/counter-reducer";
import { AppRootStateType } from "./store/store";

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

export const App: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { count, maxValue, startValue, errorMessage, disableButton } =
    useSelector<AppRootStateType, StateType>((state) => state.state);

  //чтобы не руался
  // useEffect(() => {
  //   let valueAsString = localStorage.getItem("counterValue");
  //   if (valueAsString) {
  //     let newValue = JSON.parse(valueAsString);
  //     setCount(newValue);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("counterValue", JSON.stringify(count));
  // }, [count]);

  const onClickInc = () => {
    let newCount = count + 1;
    dispatch(setCountAC(newCount));

    if (newCount === maxValue) {
      dispatch(setDisableAC({ inc: true }));
    }
    if (newCount !== startValue) {
      dispatch(setDisableAC({ reset: false }));
    }
  };

  const onClickReset = () => {
    dispatch(setCountAC(startValue));
    dispatch(setDisableAC({ reset: true, inc: false }));
  };

  const onClickSet = () => {
    dispatch(setCountAC(startValue));
    dispatch(setErrorAC(""));
    dispatch(setDisableAC({ inc: false, reset: true, set: true }));
  };

  const errorHandlerForNotValidNumbers = () => {
    dispatch(setErrorAC("Incorrect value!"));
    dispatch(setDisableAC({ inc: true, reset: true, set: true }));
  };
  const errorHandlerForValidNumbers = () => {
    dispatch(setErrorAC("enter values and press `set`"));
    dispatch(setDisableAC({ inc: true, reset: true, set: false }));
  };

  const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.currentTarget.value);
    dispatch(setMaxValueAC(value));
    if (value <= startValue || value < 0 || startValue < 0) {
      errorHandlerForNotValidNumbers();
    } else {
      errorHandlerForValidNumbers();
    }
  };
  const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.currentTarget.value);
    dispatch(setStartValueAC(value));
    if (value < 0 || value >= maxValue) {
      errorHandlerForNotValidNumbers();
    } else {
      errorHandlerForValidNumbers();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Settings
          maxValue={maxValue}
          startValue={startValue}
          disabledSet={disableButton.set}
          error={errorMessage}
          onClickSet={onClickSet}
          onChangeMaxValueHandler={onChangeMaxValueHandler}
          onChangeStartValueHandler={onChangeStartValueHandler}
        />
        <Counter
          count={count}
          maxValue={maxValue}
          disabledInc={disableButton.inc}
          disabledReset={disableButton.reset}
          error={errorMessage}
          onClickInc={onClickInc}
          onClickReset={onClickReset}
        />
      </header>
    </div>
  );
};

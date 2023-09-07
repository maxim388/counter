import React, { ChangeEvent, useCallback } from "react";
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
// ________________________________
//
// Объеденить (наложить) калькулятор и настройки

export const App: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { count, maxValue, startValue, errorMessage, disableButton } =
    useSelector<AppRootStateType, StateType>((state) => state.counter);

  const onClickInc = useCallback(() => {
    let newCount = count + 1;
    dispatch(setCountAC(newCount));

    if (newCount === maxValue) {
      dispatch(setDisableAC({ inc: true }));
    }
    if (newCount !== startValue) {
      dispatch(setDisableAC({ reset: false }));
    }
  }, [dispatch, count, maxValue, startValue]);

  const onClickReset = useCallback(() => {
    dispatch(setCountAC(startValue));
    dispatch(setDisableAC({ reset: true, inc: false }));
  }, [dispatch, startValue]);

  const onClickSet = useCallback(() => {
    dispatch(setCountAC(startValue));
    dispatch(setErrorAC(""));
    dispatch(setDisableAC({ inc: false, reset: true, set: true }));
  }, [dispatch, startValue]);

  const errorHandlerForNotValidNumbers = useCallback(() => {
    dispatch(setErrorAC("Incorrect value!"));
    dispatch(setDisableAC({ inc: true, reset: true, set: true }));
  }, [dispatch]);

  const errorHandlerForValidNumbers = useCallback(() => {
    dispatch(setErrorAC("enter values and press `set`"));
    dispatch(setDisableAC({ inc: true, reset: true, set: false }));
  }, [dispatch]);

  const onChangeMaxValueHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.currentTarget.value);
      dispatch(setMaxValueAC(value));
      if (value <= startValue || value < 0 || startValue < 0) {
        errorHandlerForNotValidNumbers();
      } else {
        errorHandlerForValidNumbers();
      }
    },
    [
      dispatch,
      startValue,
      errorHandlerForNotValidNumbers,
      errorHandlerForValidNumbers,
    ]
  );

  const onChangeStartValueHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.currentTarget.value);
      dispatch(setStartValueAC(value));
      if (value < 0 || value >= maxValue) {
        errorHandlerForNotValidNumbers();
      } else {
        errorHandlerForValidNumbers();
      }
    },
    [
      dispatch,
      maxValue,
      errorHandlerForNotValidNumbers,
      errorHandlerForValidNumbers,
    ]
  );

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

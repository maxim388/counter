const SET_COUNT = "SET_COUNT";
const SET_MAX_VALUE = "SET_MAX_VALUE";
const SET_START_VALUE = "SET_START_VALUE";
const SET_DISABLE_BUTTONS = "SET_DISABLE_BUTTONS";

type InitialStateType = {
  count: number;
  maxValue: number;
  startValue: number;
  errorMessage: string;
  disableButtonInc: boolean;
  disableButtonReset: boolean;
  disableButtonSet: boolean;
};

const initialState: InitialStateType = {
  count: 0,
  maxValue: 5,
  startValue: 0,
  errorMessage: "",
  disableButtonInc: false,
  disableButtonReset: true,
  disableButtonSet: true,
};

export const counterReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_COUNT:
      return state;
    case SET_MAX_VALUE:
      return state;
    case SET_START_VALUE:
      return state;
    case SET_DISABLE_BUTTONS:
      return state;

    default:
      return state;
  }
};

type ActionsType = SetCountType | SetMaxValueType | SetStartValueType;
type SetCountType = ReturnType<typeof setCountAC>;
type SetMaxValueType = ReturnType<typeof setMaxValueAC>;
type SetStartValueType = ReturnType<typeof setStartValueAC>;

export const setCountAC = (count: number) => {
  return {
    type: SET_COUNT,
    count,
  };
};

export const setMaxValueAC = (maxValue: number) => {
  return {
    type: SET_MAX_VALUE,
    maxValue,
  };
};

export const setStartValueAC = (startValue: number) => {
  return {
    type: SET_START_VALUE,
    startValue,
  };
};

export const setDisableAC = (buttonId: number, disable: boolean) => {
  return {
    type: SET_DISABLE_BUTTONS,
    buttonId,
    disable,
  };
};

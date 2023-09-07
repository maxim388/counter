const SET_COUNT = "SET_COUNT";
const SET_MAX_VALUE = "SET_MAX_VALUE";
const SET_START_VALUE = "SET_START_VALUE";
const SET_DISABLE_BUTTONS = "SET_DISABLE_BUTTONS";

type DisableButtonType = {
  inc: boolean;
  reset: boolean;
  set: boolean;
};

type AppRootStateType = {
  count: number;
  maxValue: number;
  startValue: number;
  errorMessage: string;
  disableButton: DisableButtonType;
};

const initialState: AppRootStateType = {
  count: 0,
  maxValue: 5,
  startValue: 0,
  errorMessage: "",
  disableButton: {
    inc: false,
    reset: true,
    set: true,
  },
};

export const AppReducer = (
  state: AppRootStateType = initialState,
  action: ActionsType
): AppRootStateType => {
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

type ActionsType =
  | SetErrorType
  | SetCountType
  | SetMaxValueType
  | SetStartValueType;

type SetErrorType = ReturnType<typeof setErrorAC>;
type SetCountType = ReturnType<typeof setCountAC>;
type SetMaxValueType = ReturnType<typeof setMaxValueAC>;
type SetStartValueType = ReturnType<typeof setStartValueAC>;

export const setErrorAC = (errorMessage: string) => {
  return {
    type: SET_COUNT,
    errorMessage,
  };
};

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

export const setDisableAC = (disableButton: DisableButtonType) => {
  return {
    type: SET_DISABLE_BUTTONS,
    disableButton,
  };
};

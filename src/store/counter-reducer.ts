const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_COUNT = "SET_COUNT";
const SET_MAX_VALUE = "SET_MAX_VALUE";
const SET_START_VALUE = "SET_START_VALUE";
const SET_DISABLE_BUTTONS = "SET_DISABLE_BUTTONS";

type DisableButtonType = {
  inc: boolean;
  reset: boolean;
  set: boolean;
};

export type StateType = {
  count: number;
  maxValue: number;
  startValue: number;
  errorMessage: string;
  disableButton: DisableButtonType;
};

const initialState: StateType = {
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
  state: StateType = initialState,
  action: ActionsType
): StateType => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case SET_MAX_VALUE:
      return {
        ...state,
        maxValue: action.maxValue,
      };
    case SET_START_VALUE:
      return {
        ...state,
        startValue: action.startValue,
      };
    case SET_DISABLE_BUTTONS:
      return {
        ...state,
        disableButton: { ...state.disableButton, ...action.disableButton },
      };
    default:
      return state;
  }
};

type ActionsType =
  | SetErrorType
  | SetCountType
  | SetMaxValueType
  | SetStartValueType
  | SetDisableType;

type SetErrorType = ReturnType<typeof setErrorAC>;
type SetCountType = ReturnType<typeof setCountAC>;
type SetMaxValueType = ReturnType<typeof setMaxValueAC>;
type SetStartValueType = ReturnType<typeof setStartValueAC>;
type SetDisableType = ReturnType<typeof setDisableAC>;

export const setErrorAC = (errorMessage: string) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage,
  } as const;
};

export const setCountAC = (count: number) => {
  return {
    type: SET_COUNT,
    count,
  } as const;
};

export const setMaxValueAC = (maxValue: number) => {
  return {
    type: SET_MAX_VALUE,
    maxValue,
  } as const;
};

export const setStartValueAC = (startValue: number) => {
  return {
    type: SET_START_VALUE,
    startValue,
  } as const;
};

type setDisableACPropsType = {
  inc?: boolean;
  reset?: boolean;
  set?: boolean;
};

export const setDisableAC = (disableButton: setDisableACPropsType) => {
  return {
    type: SET_DISABLE_BUTTONS,
    disableButton: disableButton,
  } as const;
};

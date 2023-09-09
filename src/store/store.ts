import { combineReducers, legacy_createStore } from "redux";
import { AppReducer } from "./counter-reducer";
import { loadState, saveState } from "./localStorage";

const rootReducer = combineReducers({
  counter: AppReducer,
});

const persistedState = loadState();

export const store = legacy_createStore(rootReducer, persistedState);
store.subscribe(() => {
  saveState({
    counter: store.getState().counter,
  });
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;

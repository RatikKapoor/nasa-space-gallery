import {
  configureStore,
  ThunkAction,
  Action,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import dataReducer from "../store/NasaDataStore";

export const store = configureStore({
  reducer: { nasaData: dataReducer },
  middleware: [
    createImmutableStateInvariantMiddleware({ ignore: ["nasaData"] }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

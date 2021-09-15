import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiData } from "../data/interfaces";
import { RootState } from "./store";

const initialState: ApiData[] = [];

export const slice = createSlice({
  name: "nasaData",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ApiData[]>) => {
      state = action.payload;
    },
  },
});

export const { setData } = slice.actions;

export const selectData = (state: RootState): ApiData[] => state.nasaData;

export default slice.reducer;

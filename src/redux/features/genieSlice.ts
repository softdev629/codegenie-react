import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenieState {
  module?: string | null;
  prompt_name: string | null;
  msg: any;
}

const initialState: GenieState = {
  module: localStorage.getItem("module"),
  prompt_name: null,
  msg: {},
};

export const genieSlice = createSlice({
  name: "genieSlice",
  initialState,
  reducers: {
    setModule: (state, action: PayloadAction<string>) => {
      state.module = action.payload;
    },
    setPromptName: (state, action: PayloadAction<string>) => {
      state.prompt_name = action.payload;
    },
    setMsg: (state, action: PayloadAction<Object>) => {
      state.msg = action.payload;
    },
  },
});

export const { setModule, setPromptName, setMsg } = genieSlice.actions;

export default genieSlice.reducer;

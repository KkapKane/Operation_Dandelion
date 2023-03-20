import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface dataState {
    value: {name: string, Data: number}[]
}

const initialState: dataState = {
    value: [{name: "US", Data: 0}, 
  {name: "JP", Data: 0},
  {name: "RU", Data: 0},
  {name: "CN", Data: 0},
  {name: "AU", Data: 0},
  {name: "IN", Data: 0},
  {name: "VN", Data: 0}]
}
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        rewrite: (state, action: PayloadAction<{name: string, Data: number}[]>) => {
            state.value = action.payload
        }
    }
})

export const {rewrite} = dataSlice.actions

export default dataSlice.reducer
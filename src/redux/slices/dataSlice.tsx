import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface dataState {
    value: {name: string, Data: number}[]
}

const initialState: dataState = {
  value: [
    { name: "US", Data: 0 }, // United States
    { name: "JP", Data: 0 }, // Japan
    { name: "RU", Data: 0 }, // Russia
    { name: "CN", Data: 0 }, // China
    { name: "AU", Data: 0 }, // Australia
    { name: "IN", Data: 0 }, // India
    { name: "VN", Data: 0 }, // Vietnam
    { name: "CA", Data: 0 }, // Canada
    { name: "GB", Data: 0 }, // United Kingdom
    { name: "DE", Data: 0 }, // Germany
    { name: "FR", Data: 0 }, // France
    { name: "IT", Data: 0 }, // Italy
    { name: "BR", Data: 0 }, // Brazil
    { name: "MX", Data: 0 }, // Mexico
    { name: "AR", Data: 0 }, // Argentina
    { name: "CO", Data: 0 }, // Colombia
    { name: "PE", Data: 0 }, // Peru
    { name: "NZ", Data: 0 }, // New Zealand
    { name: "ES", Data: 0 }, // Spain
    { name: "PT", Data: 0 }, // Portugal
    { name: "NL", Data: 0 }, // Netherlands
    { name: "BE", Data: 0 }, // Belgium
    { name: "SE", Data: 0 }, // Sweden
    { name: "NO", Data: 0 }, // Norway
    { name: "DK", Data: 0 }, // Denmark
    { name: "FI", Data: 0 }, // Finland
  ],
};
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
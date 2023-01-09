import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  title: string;
  message: string
}

const initialState: ErrorState = {
  title: '',
  message: ''
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<[title:string,message:string]>) => {
      state.title = action.payload[0]
      state.message = action.payload[1]
    },
    removeError: (state) => {
      state.title = ''
      state.message = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { addError, removeError } = errorSlice.actions

export default errorSlice.reducer
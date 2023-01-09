import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  value: string
}

const initialState: ErrorState = {
  value: '',
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    removeError: (state) => {
      state.value = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { addError, removeError } = errorSlice.actions

export default errorSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  error: boolean
  title: string
  message: string
}

const initialState: ErrorState = {
  error: false,
  title: '',
  message: '',
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<[title: string, message: string]>) => {
      state.error = true
      state.title = action.payload[0]
      state.message = action.payload[1]
    },
    removeError: state => {
      state.error = false
      state.title = ''
      state.message = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { addError, removeError } = errorSlice.actions

export const errorReducer = errorSlice.reducer

// how to create error state
// to create error use () => dispatch(addError(['title', 'message'])) from any page
// example <input type="button" value="create error" onClick={() => dispatch(addError(['Logout Error', 'Please logout again there has been an error']))}/>

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userInfoType = {
  name: string
  email: string
  img?: string
  isLoggedIn: boolean
}

const initialState: userInfoType = {
  name: '',
  email: '',
  img: '',
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state: userInfoType, action: PayloadAction<userInfoType>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.img = action.payload.img
      state.isLoggedIn = action.payload.isLoggedIn
    },
    logout: (state: userInfoType) => {
      state.name = ''
      state.email = ''
      state.img = ''
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = userSlice.actions
export const userReducer = userSlice.reducer

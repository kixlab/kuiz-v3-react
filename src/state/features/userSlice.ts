import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface classesType {
  cid: string
  cType: string
}

interface userInfoType {
  _id: string
  name: string
  email: string
  img?: string
  isLoggedIn: boolean
  isAdmin: boolean
  classes: classesType[]
  made: string[]
  madeOptions: string[]
  solved: string[]
}

interface userEnrollType {
  cid: string
  cType: string
}

const initialState: userInfoType = {
  _id: '',
  name: '',
  email: '',
  img: '',
  isLoggedIn: false,
  isAdmin: false,
  classes: [],
  made: [],
  madeOptions: [],
  solved: [],
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state: userInfoType, action: PayloadAction<userInfoType>) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.email = action.payload.email
      state.img = action.payload.img
      state.isLoggedIn = action.payload.isLoggedIn
      ;(state.isAdmin = action.payload.isAdmin),
        (state.classes = action.payload.classes),
        (state.made = action.payload.made),
        (state.madeOptions = action.payload.madeOptions),
        (state.solved = action.payload.solved)
    },
    logout: (state: userInfoType) => {
      state._id = ''
      state.name = ''
      state.email = ''
      state.img = ''
      state.isLoggedIn = false
      ;(state.isAdmin = false), (state.classes = []), (state.made = []), (state.madeOptions = []), (state.solved = [])
    },
    enroll: (state: userInfoType, action: PayloadAction<userEnrollType>) => {
      if (state.isLoggedIn) {
        state.classes.push({
          cid: action.payload.cid,
          cType: action.payload.cType,
        })
      }
    },
  },
})

export const { login, logout, enroll } = userSlice.actions
export const userReducer = userSlice.reducer

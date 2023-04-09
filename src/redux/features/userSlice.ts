import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfoType {
  name: string
  email: string
  img?: string
  isLoggedIn: boolean
  isAdmin: boolean
  classes: { name: string; cid: string; code: string }[]
  studentID?: string
  dataCollectionConsentState?: boolean
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    name: '',
    email: '',
    img: '',
    isLoggedIn: false,
    isAdmin: false,
    classes: [],
    made: [],
    madeOptions: [],
    solved: [],
    studentID: undefined,
    dataCollectionConsentState: undefined,
  } as UserInfoType,
  reducers: {
    login: (state: UserInfoType, action: PayloadAction<UserInfoType>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.img = action.payload.img
      state.isLoggedIn = action.payload.isLoggedIn
      state.isAdmin = action.payload.isAdmin
      state.classes = action.payload.classes
    },
    updateStudentID: (state: UserInfoType, action: PayloadAction<string>) => {
      state.studentID = action.payload
    },
    updateDataCollectionConsentState: (state: UserInfoType, action: PayloadAction<boolean>) => {
      state.dataCollectionConsentState = action.payload
    },
    logout: (state: UserInfoType) => {
      state.name = ''
      state.email = ''
      state.img = ''
      state.isLoggedIn = false
      state.isAdmin = false
      state.classes = []
      state.studentID = ''
    },
    enroll: (state: UserInfoType, action: PayloadAction<UserInfoType['classes'][number]>) => {
      if (state.isLoggedIn) {
        state.classes.push(action.payload)
      }
    },
  },
})

export const { login, logout, updateStudentID, updateDataCollectionConsentState, enroll } = userSlice.actions
export const userReducer = userSlice.reducer

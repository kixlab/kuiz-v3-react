import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { qinfoType } from '../../apiTypes/qinfo'
import { optionType } from '../../apiTypes/option'
import { clusterType } from '../../apiTypes/cluster'
import { GetQstemByOptionResults } from '../../api/question/getQStemByOption'

interface Question {
  qid: string
  question: qinfoType
  options: optionType[]
  answerCluster: clusterType[]
  distractorCluster: clusterType[]
}

interface optionWithQinfo extends optionType {
  qinfo: GetQstemByOptionResults['qstems'][0]
}

interface Cache {
  qList: qinfoType[]
  visitedQuestions: Question[]
  userMadeQuestions: qinfoType[]
  userMadeOptions: optionWithQinfo[]
}

const initialState: Cache = {
  qList: [],
  visitedQuestions: [],
  userMadeQuestions: [],
  userMadeOptions: [],
}

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addQList: (state, action: PayloadAction<Cache['qList']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.qList.push(action.payload[i])
      }
    },
    removeQList: state => {
      for (let i = 0; i < state.qList.length; i++) {
        state.visitedQuestions.pop()
      }
    },
    addVisitedProblem: (state, action: PayloadAction<Question>) => {
      state.visitedQuestions.push(action.payload)
    },
    removeVisitedProblems: state => {
      for (let i = 0; i < state.visitedQuestions.length; i++) {
        state.visitedQuestions.pop()
      }
    },
    addUserMadeQuestions: (state, action: PayloadAction<Cache['userMadeQuestions']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.userMadeQuestions.push(action.payload[i])
      }
    },
    removeUserMadeQuestions: state => {
      for (let i = 0; i < state.userMadeQuestions.length; i++) {
        state.userMadeQuestions.pop()
      }
    },
    addUserMadeOptions: (state, action: PayloadAction<Cache['userMadeOptions']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.userMadeOptions.push(action.payload[i])
      }
    },
    removeUserMadeOptions: state => {
      for (let i = 0; i < state.userMadeOptions.length; i++) {
        state.userMadeOptions.pop()
      }
    },
  },
})

export const {
  addQList,
  removeQList,
  addVisitedProblem,
  removeVisitedProblems,
  addUserMadeQuestions,
  removeUserMadeQuestions,
  addUserMadeOptions,
  removeUserMadeOptions,
} = cacheSlice.actions
export const cacheReducer = cacheSlice.reducer

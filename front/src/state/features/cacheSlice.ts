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

interface optionPageData {
  qid: string
  question: qinfoType
  answers: optionType[]
  distractors: optionType[]
}

interface Cache {
  qList: qinfoType[]
  visitedQuestions: Question[]
  userMadeQuestions: qinfoType[]
  userMadeOptions: optionWithQinfo[]
  visitedOptions: optionPageData[]
}

const initialState: Cache = {
  qList: [],
  visitedQuestions: [],
  userMadeQuestions: [],
  userMadeOptions: [],
  visitedOptions: [],
}

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    //used in main page to render questions
    addQList: (state, action: PayloadAction<Cache['qList']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.qList.push(action.payload[i])
      }
    },
    //used in create options page to refetch questions
    removeQList: state => {
      for (let i = 0; i < state.qList.length; i++) {
        state.visitedQuestions.pop()
      }
    },
    // used in solving problems and create options page
    addVisitedProblem: (state, action: PayloadAction<Question>) => {
      state.visitedQuestions.push(action.payload)
    },
    removeVisitedProblems: state => {
      for (let i = 0; i < state.visitedQuestions.length; i++) {
        state.visitedQuestions.pop()
      }
    },
    // used in my page
    addUserMadeQuestions: (state, action: PayloadAction<Cache['userMadeQuestions']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.userMadeQuestions.push(action.payload[i])
      }
    },
    // used in create questions page so that questions can be re-fetched
    removeUserMadeQuestions: state => {
      for (let i = 0; i < state.userMadeQuestions.length; i++) {
        state.userMadeQuestions.pop()
      }
    },
    // used in my page
    addUserMadeOptions: (state, action: PayloadAction<Cache['userMadeOptions']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.userMadeOptions.push(action.payload[i])
      }
    },
    // used in create options page to re-fetch
    removeUserMadeOptions: state => {
      for (let i = 0; i < state.userMadeOptions.length; i++) {
        state.userMadeOptions.pop()
      }
    },
    // used in create options page
    addVisitedOptions: (state, action: PayloadAction<optionPageData>) => {
      state.visitedOptions.push(action.payload)
    },
    //used in create options page after new option was created
    removeVisitedOptions: state => {
      for (let i = 0; i < state.visitedOptions.length; i++) {
        state.visitedOptions.pop()
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
  addVisitedOptions,
  removeVisitedOptions,
} = cacheSlice.actions

export const cacheReducer = cacheSlice.reducer

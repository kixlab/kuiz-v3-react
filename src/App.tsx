import styled from '@emotion/styled'
import './App.scss'
import { useState, useEffect } from 'react'
import { Route, Routes, BrowserRouter as Router, useNavigate, Navigate } from 'react-router-dom'
import { Gnb } from './Components/Gnb'
import { LogIn } from './Pages/LogIn'
import { Enroll } from './Pages/Enroll'
import { MainPage } from './Pages/MainPage'
import { DetailAndCreateOption } from './Pages/DetailAndCreateOption'
import { CreateQuestion } from './Pages/CreateQuestion'
import { MyPage } from './Pages/MyPage'
import { SolvingQuestion } from './Pages/SolvingQuestion'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './state/store'
import { addError, removeError } from './state/features/errorSlice'

function App() {
  return (
    <Router>
      <RoutesFromLoginState />
    </Router>
  )
}

function RoutesFromLoginState() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage = useSelector((state: RootState) => state.error.message)
  // to create error use () => dispatch(addError(['title', 'message']))
  // to remove error use () => dispatch(removeError())
  // use {error} to get the error message after error is added

  useEffect(() => {
    if (!userInfo.isLoggedIn) navigate('/login')
  }, [userInfo])

  return (
    <Container>
      <Gnb loginState={userInfo.isLoggedIn} />
      <InnerBox>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/solve" element={<SolvingQuestion />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/createQuestion" element={<CreateQuestion />} />
          <Route path="/question/createOption" element={<DetailAndCreateOption />} />
          <Route path="/mypage" element={<MyPage stemNum={3} optionNum={4} />} />
        </Routes>
      </InnerBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 599px) {
    flex-direction: column;
  }
`

const InnerBox = styled.div`
  width: 70vw;
  position: absolute;
  top: 80px;
  margin: 0 auto 0 auto;
  box-sizing: border-box;
  @media (max-width: 599px) {
    width: calc(100vw - 40px);
    margin: 0 20px 0 20px;
    top: 50px;
  }
`

export default App

import './App.scss';
import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, useNavigate, Navigate } from 'react-router-dom';
import { Gnb } from './Components/Gnb';
import { LogIn } from './Pages/LogIn';
import { Enroll } from './Pages/Enroll';
import { MainPage } from './Pages/MainPage';
import { DetailAndCreateOption } from './Pages/DetailAndCreateOption';
import { CreateQuestion } from './Pages/CreateQuestion';
import { MyPage } from './Pages/MyPage';
import { SolvingQuestion } from './Pages/SolvingQuestion';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './state/store'
import { removeError } from './state/error/errorSlice';
import { CheckDialog } from './Components/Dialogs/CheckDialog';
function App() {
  return (
    <Router>
      <RoutingFromLoginState />
    </Router>
  )
}

function RoutingFromLoginState() {
  const navigate = useNavigate();
  //TODO) USING GLOBAL STATE BY REDUX
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  //redux
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage= useSelector((state: RootState) => state.error.message)
  const errorAvailable = useSelector((state: RootState) => state.error.error)
  const dispatch = useDispatch()
  

  useEffect(() => {
      if (!isLoggedIn) navigate("/login");
      console.log(isLoggedIn)
  }, [isLoggedIn])

  function loginout(state: boolean){
    setIsLoggedIn(state);
  }


  return (
      <Container>
        <Gnb loginState={isLoggedIn}/>
        <CheckDialog title={errorTitle} message={errorMessage} modalState={errorAvailable} btnName='Ok' toggleModal={()=>{ dispatch(removeError())}}/>
        <InnerBox>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/solve" element={<SolvingQuestion />} />
          <Route path="/login" element={<LogIn login={loginout}/>} />
          <Route path="/enroll" element={<Enroll />}/>
          <Route path="/createQuestion" element={<CreateQuestion />}/>
          <Route path="/question/createOption" element={<DetailAndCreateOption />}/>
          <Route path="/mypage" element={<MyPage logout={loginout} stemNum={3} optionNum={4}/>}/>
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

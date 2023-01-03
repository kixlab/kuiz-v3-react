import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import Gnb from './Components/Gnb/Gnb'
import CreateQuestion from './Pages/CreateQuestion/CreateQuestion'
import DetailAndCreateOption from './Pages/DetailAndCreateOption/DetailAndCreateOption'
import Enroll from './Pages/Enroll/Enroll'
import LogIn from './Pages/LogIn/LogIn'
import MainPage from './Pages/MainPage/MainPage'
import MyPage from './Pages/MyPage/MyPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  function login(state: boolean) {
    setIsLoggedIn(!state)
  }

  return (
    <div className="App">
      <Router>
        <Gnb loginState={isLoggedIn} />
        <div className="Box">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LogIn isLoggedIn={isLoggedIn} login={login} />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/createQuestion" element={<CreateQuestion />} />
            <Route path="/question/createOption" element={<DetailAndCreateOption />} />
            <Route path="/mypage" element={<MyPage stemNum={3} optionNum={4} />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App

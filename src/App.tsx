import './App.scss';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Gnb } from './Components/Gnb';
import { LogIn } from './Pages/LogIn';
import { Enroll } from './Pages/Enroll';
import { MainPage } from './Pages/MainPage';
import { DetailAndCreateOption } from './Pages/DetailAndCreateOption';
import { CreateQuestion } from './Pages/CreateQuestion';
import { MyPage } from './Pages/MyPage';
import { SolvingQuestion } from './Pages/SolvingQuestion';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  useEffect(() => {
    console.log(isLoggedIn)
    setIsLoggedIn(true);
  }, [])

  return (
    <div className='App'>
      <Router>
        <Gnb loginState={isLoggedIn}/>
        <div className='Box'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/solve" element={<SolvingQuestion />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/enroll" element={<Enroll />}/>
          <Route path="/createQuestion" element={<CreateQuestion />}/>
          <Route path="/question/createOption" element={<DetailAndCreateOption />}/>
          <Route path="/mypage" element={<MyPage stemNum={3} optionNum={4}/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App

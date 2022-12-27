import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Gnb from './Components/Gnb/Gnb';
import LogIn from './Pages/LogIn/LogIn';
import Enroll from './Pages/Enroll/Enroll';
import MainPage from './Pages/MainPage/MainPage';
import DetailAndCreateOption from './Pages/DetailAndCreateOption/DetailAndCreateOption';
import CreateQuestion from './Pages/CreateQuestion/CreateQuestion';
import MyPage from './Pages/MyPage/MyPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  return (
    <div className="App">
      <Gnb loginState={isLoggedIn}/>
      <div className='Box'>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/enroll" element={<Enroll />}/>
          <Route path="/createQuestion" element={<CreateQuestion />}/>
          <Route path="/question/createOption" element={<DetailAndCreateOption />}/>
          <Route path="/mypage" element={<MyPage stemNum={3} optionNum={4}/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

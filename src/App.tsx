import { Gnb } from './Components/Gnb'
import { LogIn } from './Pages/LogIn'
import { Enroll } from './Pages/Enroll'
import { MainPage } from './Pages/MainPage'
import { DetailAndCreateOption } from './Pages/DetailAndCreateOption'
import { CreateQuestion } from './Pages/CreateQuestion'
import { MyPage } from './Pages/MyPage'
import { SolvingQuestion } from './Pages/SolvingQuestion'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ProtectedAuthenticatedRoutes, ProtectedUnauthenticatedRoutes } from './routes/protectedRoutes'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './state/store'
import { removeError } from './state/features/errorSlice'
import { CheckDialog } from './Components/Dialogs/CheckDialog'

function App() {

  console.log('here')
  console.log(`${process.env.REACT_APP_CLIENT_ID}`)
  //redux
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage = useSelector((state: RootState) => state.error.message)
  const errorAvailable = useSelector((state: RootState) => state.error.error)

  return (
    <Container>
      <Router>
        <Global styles={GlobalStyles} />
        <Gnb loginState={userInfo.isLoggedIn} />
        <CheckDialog
          title={errorTitle}
          message={errorMessage}
          modalState={errorAvailable}
          btnName="Ok"
          toggleModal={() => {
            dispatch(removeError())
          }}
        />
        <InnerBox>
          <Routes>
            {/* routes logged in people can't access */}
            <Route element={<ProtectedUnauthenticatedRoutes />}>
              {/* all routes lead to login page */}
              <Route path="*" element={<LogIn />} />
            </Route>
            {/* routes only logged in people can access */}
            <Route element={<ProtectedAuthenticatedRoutes />}>
              {/* every route that is not specified will lead to MainPage */}
              <Route path="*" element={<MainPage />} />
              <Route path="/solve" element={<SolvingQuestion />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/createQuestion" element={<CreateQuestion />} />
              <Route path="/question/createOption" element={<DetailAndCreateOption />} />
              <Route path="/mypage" element={<MyPage stemNum={3} optionNum={4} />} />
            </Route>
          </Routes>
        </InnerBox>
      </Router>
    </Container>
  )
}

const GlobalStyles = css`
  @font-face {
    font-family: 'Raleway';
    src: url(./Asset/Raleway-ExtraBold.ttf);
  }

  @font-face {
    font-family: 'inter-r';
    src: url(./Asset/Inter-Regular.ttf);
  }
  @font-face {
    font-family: 'inter-m';
    src: url(./Asset/Inter-Medium.ttf);
  }
  @font-face {
    font-family: 'inter-sb';
    src: url(./Asset/Inter-SemiBold.ttf);
  }
  @font-face {
    font-family: 'inter-eb';
    src: url(./Asset/Inter-ExtraBold.ttf);
  }
  html {
    background-color: #e6eaef;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif;
  }
  .App {
    display: flex;
    justify-content: center;
  }
  .Box {
    width: 70vw;
    position: absolute;
    top: 80px;
    margin: 0 auto 0 auto;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    height: 48px;
    padding: 16px;
    border-radius: 6px;
    border: none;
    background-color: #3d8add;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  button:hover {
    background-color: #205e9f;
    cursor: pointer;
  }
  button:disabled {
    background-color: #bdbdbd;
  }
  @media (max-width: 599px) {
    .App {
      flex-direction: column;
    }
    .Box {
      width: calc(100vw - 40px);
      margin: 0 20px 0 20px;
      top: 50px;
    }
  }
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'inter-r';
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

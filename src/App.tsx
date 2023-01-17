import styled from '@emotion/styled'
import { Gnb } from './Components/Gnb'
import { LogIn } from './pages/LogIn'
import { Enroll } from './pages/Enroll'
import { MainPage } from './pages/MainPage'
import { DetailAndCreateOption } from './pages/DetailAndCreateOption'
import { CreateQuestion } from './pages/CreateQuestion'
import { MyPage } from './pages/MyPage'
import { SolvingQuestion } from './pages/SolvingQuestion'
import { Global } from '@emotion/react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ProtectedAuthenticatedRoutes, ProtectedUnauthenticatedRoutes } from './routes/protectedRoutes'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './state/store'
import { removeError } from './state/features/errorSlice'
import { CheckDialog } from './Components/dialogs/CheckDialog'
import { GlobalStyles } from './styles/globalStyle'

function App() {
  //redux
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage = useSelector((state: RootState) => state.error.message)
  const errorAvailable = useSelector((state: RootState) => state.error.error)

  return (
    <Container>
      <Global styles={GlobalStyles} />
      <Router>
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

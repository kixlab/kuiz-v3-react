import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { RootState, store } from '@redux/store'
import type { AppProps } from 'next/app'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { GlobalStyles } from 'src/styles/globalStyle'
import { removeError } from '@redux/features/errorSlice'
import { CheckDialog } from '@components/Dialogs/CheckDialog'
import { Gnb } from '@components/Gnb'

export default function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage = useSelector((state: RootState) => state.error.message)
  const errorAvailable = useSelector((state: RootState) => state.error.error)

  return (
    <Provider store={store}>
      <Container>
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
          <Component {...pageProps} />
        </InnerBox>
      </Container>
    </Provider>
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

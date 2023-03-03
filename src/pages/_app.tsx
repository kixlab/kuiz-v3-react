import { GlobalDialog } from '@components/GlobalDialog'
import { Gnb } from '@components/Gnb'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { store } from '@redux/store'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { GlobalStyles } from 'src/styles/globalStyle'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Container>
          <Global styles={GlobalStyles} />
          <Gnb />
          <GlobalDialog />
          <InnerBox>
            <Component {...pageProps} />
          </InnerBox>
        </Container>
      </SessionProvider>
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

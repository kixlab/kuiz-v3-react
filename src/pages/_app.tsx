import { GlobalDialog } from '@components/GlobalDialog'
import { Gnb } from '@components/Gnb'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { store } from '@redux/store'
import { ResetStyles } from '@styles/resetStyle'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { GlobalStyles } from 'src/styles/globalStyle'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Global styles={GlobalStyles} />
        <Global styles={ResetStyles} />
        <Gnb />
        <Content>
          <Component {...pageProps} />
        </Content>
        <GlobalDialog />
      </SessionProvider>
    </Provider>
  )
}

const Content = styled.div`
  padding-bottom: 60px;
  max-width: 800px;
  margin: 40px auto;
`

import styled from '@emotion/styled'
import { View } from './View'

interface Props {
  children: React.ReactNode
}

export const Item = View<Props>(({ children, ...props }) => {
  return <Container {...props}>{children}</Container>
})

const Container = styled.div`
  ::before {
    content: '• ';
  }
`

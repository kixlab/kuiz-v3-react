import styled from '@emotion/styled'
import { View } from '../View'
import { typography } from '@styles/theme'

interface Props {
  children: React.ReactNode
}

export const CaptionText = View<Props>(({ children, ...props }) => {
  return <Container {...props}>{children}</Container>
})

const Container = styled.div`
  ${typography.overline}
`

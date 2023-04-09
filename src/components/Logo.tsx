import styled from '@emotion/styled'
import { typography } from '@styles/theme'
import { View } from './basic/View'

interface Props {}

export const Logo = View<Props>(({ ...props }) => {
  return (
    <Container {...props}>
      <LogoIcon src={'/logo.svg'} />
      KUIZ
    </Container>
  )
})

const Container = styled.div`
  ${typography.logo};
  display: flex;
  align-items: center;
  gap: 8px;
`

const LogoIcon = styled.img`
  width: 22px;
  height: 22px;
`

import styled from '@emotion/styled'
import { View } from './basic/View'

interface Props {}

export const Required = View<Props>(({ ...props }) => {
  return <Container {...props}>* Required</Container>
})

const Container = styled.span`
  color: orangered;
  font-size: 10px;
  vertical-align: top;
`

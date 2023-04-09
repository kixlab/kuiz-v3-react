import styled from '@emotion/styled'
import { View } from './basic/View'
import { css } from '@emotion/react'

interface Props {
  height?: number
}

export const Divider = View<Props>(({ height = 1, ...props }) => {
  return <Container height={height} {...props} />
})

const Container = styled.div<{ height: number }>`
  ${({ height }) => css`
    width: 100%;
    border: 0;
    height: ${height}px;
    background-color: #dbdbdb;
  `}
`

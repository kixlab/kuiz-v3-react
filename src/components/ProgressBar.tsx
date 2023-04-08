import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { View } from './basic/View'

interface Props {
  percentage: number
  children?: React.ReactNode
}

export const ProgressBar = View<Props>(({ percentage, children, ...props }) => {
  return (
    <Container {...props}>
      <Progress percentage={Math.max(percentage, 3)} />
      <Label>{children}</Label>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  height: 24px;
  background-color: white;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`

const Progress = styled.div<{ percentage: number }>`
  ${({ percentage }) => css`
    width: ${percentage}%;
    background-color: #08c760;
    height: 100%;
  `}
`

const Label = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
`
